import React from 'react';
import ApartmentForm from './ApartmentForm';
import ApartmentIndex from './ApartmentIndex';
import ApartmentMap from './ApartmentMap';
import {} from 'jquery-ujs';



class ApartmentsDashboard extends React.Component {

    constructor() {
        super();
        this.increaseApartments = this.increaseApartments.bind(this);
        this.decreaseApartments = this.decreaseApartments.bind(this);
        this.state = { apartments: {} };


    }

    componentDidUpdate() {
            
        let nyc = {lat: 40.7128, lng: -73.935242};
      
        let map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: nyc
        });

        let markers = [];
        let bounds = new google.maps.LatLngBounds();

        if (Object.keys(this.state.apartments).length >= 1) {
        
        for (let x in this.state.apartments) {

                let infowindow = new google.maps.InfoWindow({
                    content: `<p><b>${this.state.apartments[x].address}</b></p><p>$${this.state.apartments[x].price}</p>`,
                });

                let marker = new google.maps.Marker({
                    position: {lat: Number(this.state.apartments[x].lat), lng: Number(this.state.apartments[x].lng)},
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
            url: '/user-apartments',
            dataType: 'json',
            async: true,
            success: (result) => {
                
                console.log(result);

                this.setState(result);

            },
            error: (data) => {

                this.state = { apartments: {} };
            }
        });
    }
    

    increaseApartments(newPoint) {

        
        $.ajax({
            type: 'post', 
            contentType: 'application/json',
            url: '/user-apartments',
            data: JSON.stringify({ data: {toAdd: newPoint} }),
            dataType: 'json',
            async: true,
            success: (data) => {

                console.log(data);
                
                if (data.message === 'saved') {

                    const ApartmentsCopy = {...this.state.apartments};

                    newPoint['lat'] = data.lat;
                    newPoint['lng'] = data.lng;

                    ApartmentsCopy[`${data.id}`] = newPoint;

                    console.log(newPoint);
            
                    this.setState({ apartments: ApartmentsCopy });

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
                        <div class="alert alert-warning fade show" role="alert">
                            You already have this address saved.
                        </div>      
                        `
                    );

                    $(flash).insertAfter($('.navbar'));

                    flash.fadeOut(2000);

                    setTimeout(()=> {

                        flash.remove();

                    }, 2000);   

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

    decreaseApartments(oldPoint) {

        console.log(oldPoint);

        
        if(confirm('Are you sure you want to do this?')) {

            $.ajax({
                type: 'delete', 
                contentType: 'application/json',
                url: '/user-apartments',
                data: JSON.stringify({ data: {toDelete: oldPoint} }),
                dataType: 'json',
                async: true,
                success: (data) => {

                    console.log(data);
                    
                    if (data.message) {

                        const apartmentsCopy = {...this.state.apartments};

                        delete apartmentsCopy[oldPoint];
            
                        this.setState({ apartments: apartmentsCopy });
    
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
                <ApartmentForm apartments={this.state.apartment} stateLength={Object.keys(this.state.apartments).length} updateApartments={this.increaseApartments}/>
                <ApartmentIndex apartments={this.state.apartments} updateApartments={this.decreaseApartments}/>
                <ApartmentMap />
                
            </React.Fragment>
        );
    }
    

}

export default ApartmentsDashboard;

