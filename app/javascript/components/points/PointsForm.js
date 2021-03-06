import React from 'react';










class PointsForm extends React.Component {

    //nameInput = React.createRef();
    //addressInput = React.createRef();

    constructor() {
        super();
        this.addPoint = this.addPoint.bind(this);
    }



    addPoint(submitEvent) {

        submitEvent.preventDefault();

        if (this.refs.nameInput.value.length === 0 || this.refs.addressInput.value.length === 0) {

            return;

        }

        this.props.updatePoints({name: this.refs.nameInput.value, address: this.refs.addressInput.value});

        console.log({name: this.refs.nameInput.value, address: this.refs.addressInput.value});

        submitEvent.currentTarget.reset();

    }

    render() {
        

        return (
            <div className="col-12">
                <form  className="jumbotron bg-dark" onSubmit={this.addPoint}>
                    <div className="form-group">
                        <label className="text-light" htmlFor="point-name">Name</label>
                        <input id="name-input" ref="nameInput" type="text" className="form-control" aria-describedby="emailHelp" placeholder="Name" readOnly={this.props.stateLength >= 5}/>
                    </div>
                    <div className="form-group">
                        <label className="text-light" htmlFor="Address">Address</label>
                        <input id="address-input" ref="addressInput" type="text" className="form-control" placeholder="Address" readOnly={this.props.stateLength >= 5}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <h4 className="text-light counter badge badge-secondary">{this.props.stateLength}/5</h4>
                </form>
            </div>
        );
    }
    

}

export default PointsForm;