import React from 'react';


class ApartmentCard extends React.Component {


    removeApartment = event => {

        event.preventDefault();

        this.props.removeApartments(this.props.alias);

    }


    render() {
        return(
            
            <div className="card" id={this.props.alias}>
                <div className="card-header">
                    {this.props.ApartmentInfo.address.replace(', USA', '')}
                </div>
                <div className="card-body">
                    <p className="card-text">Price: ${this.props.ApartmentInfo.price} per month</p>
                    <p className="card-text">Baths: {this.props.ApartmentInfo.baths}</p>
                    <p className="card-text">Beds: {this.props.ApartmentInfo.beds}</p>
                    <p className="card-text">In Unit Laundry: {this.props.ApartmentInfo.in_unit_laundry ? "Yes" : "No"}</p>
                    <p className="card-text">Pets Allowed: {this.props.ApartmentInfo.pets_allowed ? "Yes" : "No"}</p>
                    <p className="card-text">Has Own Parking: {this.props.ApartmentInfo.has_own_parking ? "Yes" : "No"}</p>
                    <a href="#" onClick={this.removeApartment} className="btn btn-danger btn-sm">Delete</a>
                </div>
            </div>

        );
    }   

};





export default ApartmentCard;