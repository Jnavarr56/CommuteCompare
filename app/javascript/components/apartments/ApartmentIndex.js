import React from 'react';
import ApartmentCard from './ApartmentCard';



class ApartmentIndex extends React.Component {

    render() {

        if (Object.keys(this.props.apartments).length > 0)  {

            return (
                <div className="row map-row">
                    <div className="col-12 bg-dark jumbotron">
                        {Object.keys(this.props.apartments).map(key => <ApartmentCard removeApartments={this.props.updateApartments} key={key} alias={key} ApartmentInfo={this.props.apartments[key]}/>)}
                    </div>
                </div>
                
            );

        }

        else {

            return (
                
                    <div className="col-12 no-points">
                        <div className="card text-white bg-secondary mb-3">
                            <div className="card-header">Time to get started!</div>
                            <div className="card-body">
                                <h5 className="card-title">Add your potential apartments (max of 8).</h5>
                                <p className="card-text">They all have to be in NYC.</p>
                            </div>
                        </div>
                    </div>
            );

        }
    }
    

}

export default ApartmentIndex;