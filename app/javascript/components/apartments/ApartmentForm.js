import React from 'react';
import ApartmentMap from './ApartmentMap';
import $ from 'jquery';




class ApartmentsForm extends React.Component {

    //nameInput = React.createRef();
    //addressInput = React.createRef();

    constructor() {
        super();
        this.addApartment = this.addApartment.bind(this);
    }

    checkInputHandler(e){

        e.currentTarget.value = e.currentTarget.checked;

        console.log(e.currentTarget.value);

    }



    addApartment(submitEvent) {

        submitEvent.preventDefault();

        console.log(this.refs);
        

        if (this.refs.addressInput.value.length === 0 || this.refs.priceInput.value.length === 0) {

            return;

        }

        if (this.refs.bathsInput.value.length === 0) {

            this.refs.bathsInput.value = 0;

        }

        if (this.refs.bedsInput.value.length === 0) {

            this.refs.bedsInput.value = 0;

        }

        console.log(this.refs);

        this.props.updateApartments(
            
            {
                address: this.refs.addressInput.value,
                price: this.refs.priceInput.value,
                baths: this.refs.bathsInput.value,
                beds: this.refs.bedsInput.value,
                pets_allowed: this.refs.petsInput.value,
                in_unit_laundry: this.refs.laundryInput.value,
                has_own_parking: this.refs.parkingInput.value

            }
            
        );

        submitEvent.currentTarget.reset();

    }

    render() {


        

        return (
            <div className="col-12">
                <form  className="jumbotron bg-dark" onSubmit={this.addApartment}>
                    <div className="form-group">
                        <label className="text-light" htmlFor="Address">Address</label>
                        <input id="address-input" ref="addressInput" type="text" className="form-control" placeholder="Address" readOnly={this.props.stateLength >= 8}/>
                    </div>
                    <label className="text-light" htmlFor="price">Price</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">$/mo</div>
                        </div>
                        <input ref="priceInput" type="number" className="form-control" placeholder="0000.00" readOnly={this.props.stateLength >= 8}/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label className="text-light" htmlFor="baths">Baths</label>
                        <input ref="bathsInput" id="baths-input" ref="bathsInput" type="number" className="form-control" placeholder="Baths" readOnly={this.props.stateLength >= 8}/>
                    </div>
                    <div className="form-group">
                        <label className="text-light" htmlFor="beds">Beds</label>
                        <input ref="bedsInput" id="beds-input" ref="bedsInput" type="number" className="form-control" placeholder="Beds" readOnly={this.props.stateLength >= 8}/>
                    </div>
                    <div className="form-check">
                        
                        <input onChange={this.checkInputHandler} ref="petsInput" id="pets_allowed-input" type="checkbox" className="form-check-input" placeholder="pets_allowed" defaultValue={false} readOnly={this.props.stateLength >= 8}/>
                        <label className="text-light form-check-label" htmlFor="pets_allowed">Pets Allowed?</label>
                    </div>
                    <div className="form-check">
                        
                        <input onChange={this.checkInputHandler} ref="laundryInput" id="in_unit_laundry-input" type="checkbox" className="form-check-input" placeholder="in_unit_laundry" defaultValue={false} readOnly={this.props.stateLength >= 8}/>
                        <label className="text-light form-check-label" htmlFor="in_unit_laundry">In Unit Laundry?</label>
                    </div>
                    <div className="form-check ">
                        
                        <input onChange={this.checkInputHandler} ref="parkingInput" id="has_own_parking-input" type="checkbox" className="form-check-input" placeholder="has_own_parking" defaultValue={false} readOnly={this.props.stateLength >= 8}/>
                        <label className="text-light form-check-label" htmlFor="has_own_parking">Has Own Parking</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <h4 className="counter badge badge-secondary">{this.props.stateLength}/8</h4>
                </form>
                
            </div>
        );
    }
    

}

export default ApartmentsForm;