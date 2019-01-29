import React from 'react';
import PointCard from './PointCard';

class PointsIndex extends React.Component {


    render() {

        return (
            <div className="col-7">
                {Object.keys(this.props.points).map(key => <PointCard removePoints={this.props.updatePoints}key={key} alias={key} pointInfo={this.props.points[key]}/>)}
            </div>
        );
    }
    

}

export default PointsIndex;