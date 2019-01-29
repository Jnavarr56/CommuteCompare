import React from 'react';



class PointsForm extends React.Component {

    //nameInput = React.createRef();
    //addressInput = React.createRef();

    addPoint = submitEvent => {

        submitEvent.preventDefault();

        if (this.refs.nameInput.value.length === 0 || this.refs.addressInput.value) {

            return;

        }

        this.props.updatePoints({name: this.refs.nameInput.value, address: this.refs.addressInput.value});

        submitEvent.currentTarget.reset();

    }

    render() {
        

        return (
            <div className="col-4">
                <form onSubmit={this.addPoint}>
                    <div className="form-group">
                        <label htmlFor="point-name">Name</label>
                        <input ref="nameInput" type="text" className="form-control" aria-describedby="emailHelp" placeholder="Name" readOnly={this.props.stateLength >= 5}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Address">Address</label>
                        <input ref="addressInput" type="text" className="form-control" placeholder="Address" readOnly={this.props.stateLength >= 5}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
    

}

export default PointsForm;