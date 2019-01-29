import React from 'react';

class PointCard extends React.Component {


    removePoint = event => {

        event.preventDefault();

        this.props.removePoints(this.props.alias);

    }


    render() {
        return(
            <div className="card">
                <h5 className="card-header">{this.props.pointInfo.name}</h5>
                <div className="card-body">
                    <p className="card-text">{this.props.pointInfo.address}</p>
                    <a href="#" onClick={this.removePoint} className="btn btn-danger">Delete</a>
                </div>
            </div>
        );
    }   

};



export default PointCard;