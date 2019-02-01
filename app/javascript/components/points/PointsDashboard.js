import React from 'react';
import PointsForm from './PointsForm';
import PointsIndex from './PointsIndex';
import PointsMap from './PointsMap';
import {} from 'jquery-ujs';




class PointsDashboard extends React.Component {

    constructor() {
        super();
        this.increasePoints = this.increasePoints.bind(this);
        this.decreasePoints = this.decreasePoints.bind(this);
        this.state = { points: {} };

    }

    componentDidUpdate() {

            
        let nyc = {lat: 40.7128, lng: -73.935242};
      
        let map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: nyc
        });
        
        if (Object.keys(this.state.points).length > 0) {

            let markers = [];
            let bounds = new google.maps.LatLngBounds();
            
            for (let x in this.state.points) {

                let infowindow = new google.maps.InfoWindow({
                    content: `<p><b>${this.state.points[x].name}</b></p>`
                });

                let marker = new google.maps.Marker({
                    position: {lat: Number(this.state.points[x].lat), lng: Number(this.state.points[x].lng)},
                    map: map
                });

                marker.addListener('mouseover', function() {

                    infowindow.open(map, marker);

                    $(`#${x}`).addClass('bg-primary text-light');

                });
            
                marker.addListener('mouseout', function() {

                    infowindow.close();

                    $(`#${x}`).removeClass('bg-primary text-light');

                });

                markers.push(marker);

            }

            for (let i = 0; i < markers.length; i++) {

                bounds.extend(markers[i].getPosition());
            }

            map.fitBounds(bounds);

        }

    }


      



      

    
    componentDidMount() {

        /*
        fetch('/user-points')
         .then(response => response.json())
         .then(
            (result) => {
                this.setState(result);
            },
            (error) => {
                this.state = { points: {} };
            }
        )
        */

        $.ajax({
            type: 'get', 
            contentType: 'application/json',
            url: '/user-points',
            dataType: 'json',
            async: true,
            success: (result) => {
                
                console.log(result);

                this.setState(result);

            },
            error: (data) => {

                this.state = { points: {} };
            }
        });
    }
    

    increasePoints(newPoint) {

        
    
        $.ajax({
            type: 'post', 
            contentType: 'application/json',
            url: '/user-points',
            data: JSON.stringify({ data: {toAdd: newPoint} }),
            dataType: 'json',
            async: true,
            success: (data) => {

                console.log(data);
                
                if (data.message === 'saved') {

                    const pointsCopy = {...this.state.points};

                    newPoint['lat'] = data.lat;
                    newPoint['lng'] = data.lng;

                    pointsCopy[`${data.id}`] = newPoint;
            
                    this.setState({ points: pointsCopy });

                }

                else if (data.message === 'already_exists' ) {

                    let flash = $(
                        `
                        <div class="alert alert-warning fade show" role="alert">
                            You've already saved this address.
                        </div>
                        `
                    );
    
                    $(flash).insertAfter($('.navbar'));

                    flash.fadeOut(2000);

                    setTimeout(()=> {

                        flash.remove();

                    }, 2000);   

                }
                
                else if (data.message === 'invalid_address') { 

                    console.log('ERROR');

                    let flash = $(
                        `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            This address is <strong>invalid.</strong> 
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        `
                    );
    
                    $(flash).insertAfter($('.navbar'));

                }

                else if (data.message === 'is_not_in_nyc') { 

                    console.log('ERROR');

                    let flash = $(
                        `
                        <div class="alert alert-warning fade show" role="alert">
                            This address is not in NYC.
                        </div>
                        `
                    );
    
                    $(flash).insertAfter($('.navbar'));

                    flash.fadeOut(2000);

                    setTimeout(()=> {

                        flash.remove();

                    }, 2000);

                }

                else {

                    let flash = $(
                        `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Oh no!</strong> There was an error. Try again later.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        `
                    );

                    $(flash).insertAfter($('.navbar'));
                }
            },
            error: (data) => {

                console.log('ERROR');

                let flash = $(
                    `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Oh no!</strong> There was an error. Try again later.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `
                );

                $(flash).insertAfter($('.navbar'));

            }
        });



    }

    decreasePoints(oldPoint) {

        
        if(confirm('Are you sure you want to do this?')) {

            $.ajax({
                type: 'delete', 
                contentType: 'application/json',
                url: '/user-points',
                data: JSON.stringify({ data: {toDelete: oldPoint} }),
                dataType: 'json',
                async: true,
                success: (data) => {
                    
                    if (data.message) {

                        const pointsCopy = {...this.state.points};

                        delete pointsCopy[oldPoint];
            
                        this.setState({ points: pointsCopy });
    
                        let flash = $(`<div class="alert alert-success" role="alert">Point deleted sucessfully!</div>
                        `);

                        $(flash).insertAfter($('.navbar'));

                        flash.fadeOut(2000);

                        setTimeout(()=> {

                            flash.remove();

                        }, 2000);

                    }

                    else {

                        console.log('ERROR');

                        let flash = $(
                            `
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Oh no!</strong> There was an error. Try again later.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            `
                        );

                        $(flash).insertAfter($('.navbar'));

                    }


                },
                error: (data) => {

                    console.log('ERROR');

                    let flash = $(
                        `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Oh no!</strong> There was an error. Try again later.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        `
                    );

                    $(flash).insertAfter($('.navbar'));

                }
            });

        }


    }

    render() {

        return (
            <React.Fragment>
                <PointsForm stateLength={Object.keys(this.state.points).length} updatePoints={this.increasePoints}/>
                <PointsIndex points={this.state.points} updatePoints={this.decreasePoints}/>
                <PointsMap />
                
            </React.Fragment>
        );
    }
    

}

export default PointsDashboard;

