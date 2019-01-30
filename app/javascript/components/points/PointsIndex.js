import React from 'react';
import PointCard from './PointCard';



class PointsIndex extends React.Component {

    render() {

        if (Object.keys(this.props.points).length > 0)  {

            return (
                <div className="row map-row">
                    <div className="col-12 bg-dark jumbotron"> 
                        {Object.keys(this.props.points).map(key => <PointCard removePoints={this.props.updatePoints} key={key} alias={key} pointInfo={this.props.points[key]}/>)}
                    </div>
                </div>
                
            );

        }

        else {

            return (
                
                    <div className="col-12  no-points">
                        <div className="card text-white bg-secondary mb-3">
                            <div className="card-header">Time to get started!</div>
                            <div className="card-body">
                                <h5 className="card-title">Add the places you visit most frequently.</h5>
                                <p className="card-text">You can add a maxium of 5 and they all have to be in NYC.</p>
                            </div>
                        </div>
                    </div>
            );

        }
    }
    

}

export default PointsIndex;