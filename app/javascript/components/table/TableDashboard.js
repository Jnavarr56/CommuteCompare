import React from 'react';
import CommuteTable from './CommuteTable';
import {} from 'jquery-ujs';


class TableDashboard extends React.Component {

    constructor() {
        super();
        this.progressBar = React.createRef();
        this.state = {tableData: {}};
        this.progressTicker;
        this.count = 1;
        this.didNotUpdate;
        this.missing;
        
    }

    componentDidUpdate() {

        let options = {
            valueNames: [ 'apartmentaddress', 'price', 'baths', 'inunitlaundry', 'petsallowed', 'hasownparking']
        };

        if (Object.keys(this.state.tableData).length > 0) {

        this.state.tableData.header2.forEach((x, i) => {

            if (x.length > 0) {

                if (x[0].toLowerCase() === 't') {

                    options.valueNames.push({name: `${x[0].toLowerCase()}${i}`, attr: 'data-duration'});

                }
                else {

                    options.valueNames.push(`${x[0].toLowerCase()}${i}`);

                }

                
                
            }
        
        
        });

        console.log(options.valueNames);
          
        let tableList = new List('tableID', options);
        
        $('.sort').each(function() {

            $(this).append(`</br><i id=${$(this).attr('data-sort')} class="sort-icon fas fa-sort"></i>`);

            $(this).click(function() {

                $('.sort-icon').each(function() {

                    $(this).attr('class', 'sort-icon fas fa-sort');

                });

                if($(this).hasClass('asc')) {

                    $(`#${$(this).attr('data-sort')}`).attr('class', 'sort-icon fas fa-sort-up');
                    
                }

                else if($(this).hasClass('desc')) {

                    $(`#${$(this).attr('data-sort')}`).attr('class', 'sort-icon fas fa-sort-down');

                }

            });


        });



        let nyc = {lat: 40.7128, lng: -73.935242};
      
        let map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: nyc
        });

        let markers = [];
        let bounds = new google.maps.LatLngBounds();

        if (this.state.tableData.coords.length >= 1) {
        
        for (let x = 0; x < this.state.tableData.coords.length; x++) {

                let infowindow = new google.maps.InfoWindow({
                    content: `<p><b>${this.state.tableData.coords[x].name}</b>></p><p>${this.state.tableData.coords[x].type === 'apartment' ? '$' + this.state.tableData.coords[x].price : this.state.tableData.coords[x].address}</p>`,
                });

                let marker = new google.maps.Marker({
                    position: {lat: Number(this.state.tableData.coords[x].lat), lng: Number(this.state.tableData.coords[x].lng)},
                    map: map,
                    icon: {
                        url: `http://maps.google.com/mapfiles/ms/icons/${this.state.tableData.coords[x].type === 'apartment' ? 'blue' : 'yellow'}-dot.png`
                    }
                });

                marker.addListener('mouseover', function() {

                    infowindow.open(map, marker);

                });
            
                marker.addListener('mouseout', function() {

                    infowindow.close();

                });
                
                markers.push(marker);

            }

            for (let i = 0; i < markers.length; i++) {

                bounds.extend(markers[i].getPosition());

            }

            map.fitBounds(bounds);

        }

    }

    }


    
    componentDidMount() {

        this.progressTicker = setInterval(()=> {

            this.refs.progressBar.style.width = `${this.count ++}%`;
            
            if (this.count === 80) {

                clearInterval(this.progressTicker);
            }

        }, 2000);

        let obj = this;


        $.ajax({
            type: 'get', 
            contentType: 'application/json',
            url: `/get-table-data/transit/${null}/${new Date().getTime()/1000}`,
            dataType: 'json',
            async: true,
            success: (data) => {

                console.log(data);

                if (data.message === "MISSING MODELS") {

                    clearInterval(this.progressTicker);

                    if (this.count < 101) {

                        this.progressTicker = setInterval(()=> {

                            this.refs.progressBar.style.width = `${this.count ++}%`;
                            
                            if (this.count === 101) {
                
                                clearInterval(this.progressTicker);

                                setTimeout(()=> {

                                    this.didNotUpdate = true;

                                    if (data.ERROR_CODE === "MISSING APARTMENTS") {

                                        this.missing = "apartments";
                                    }

                                    else if (data.ERROR_CODE === "MISSING POINTS") {

                                        this.missing = "points";
                                    }

                                    else {

                                        this.missing = "both";
                                    }

                                    this.forceUpdate();

                                }, 1000);
                                
                            }
                
                        }, 15);


                    }

                }

                else if (data.message === "SUCCESS") {


                    clearInterval(this.progressTicker);
                    
                    if (this.count < 101) {

                        this.progressTicker = setInterval(()=> {

                            this.refs.progressBar.style.width = `${this.count ++}%`;
                            
                            if (this.count === 101) {
                
                                clearInterval(this.progressTicker);

                                setTimeout(()=> {

                                    this.setState({tableData: data.table_data});

                                }, 1000);
                                
                            }
                
                        }, 15);

                    }

                }

                else {

                    console.log(data);

                    let flash = $(
                        `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Oh no!</strong> There was an error retrieving your table data. Try again later.
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

                console.log(data);

                let flash = $(
                    `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Oh no!</strong> There was an error retrieving your table data. Try again later.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `
                );

                $(flash).insertAfter($('.navbar'));

                clearInterval(this.progressTicker);

            }
        });

    }
    

    

    render() {

        if (!this.didNotUpdate && Object.keys(this.state.tableData).length === 0) {

            return (

                <div className="progress">
                    <div ref="progressBar" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

            )

        }

        else if (this.didNotUpdate) {

            return (

                <div className="jumbotron bg-dark has-no-models">
                    <h1 className="display-4">You haven't chosen any {this.missing === "both" ? "any apartments or points of interest" : (this.missing === "apartments" ? "apartments" : "points of interest")} yet!</h1>
                    <p className="lead">You'll need to do that before I can generate your table.</p>
                    <hr className="my-4"/>
                    <p>Click <a href="/points">Points of Interest</a> or <a href="/apartments">Apartments</a> in the nav bar to get started.</p>
                </div>

            );

        }

        else {

            console.log(this.count)

            return (
                
                    <React.Fragment>
                        
                        <div id="map"></div>
                        
                        <CommuteTable sortTable={this.sortTable} tableData={this.state.tableData} />
                    </React.Fragment>
                
    
                
            );

        }


    }
    

}

export default TableDashboard;

