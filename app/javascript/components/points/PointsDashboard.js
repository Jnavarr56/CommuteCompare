import React from 'react';
import PointsForm from './PointsForm';
import PointsIndex from './PointsIndex';
import PointsMap from './PointsMap';

class PointsDashboard extends React.Component {

    constructor() {
        super();
        this.increasePoints = this.increasePoints.bind(this);
        this.decreasePoints = this.decreasePoints.bind(this);
        let defaultKey = `points${Date.now()}`;
        this.state = { points: {} };

    }

    
    componentDidMount() {
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
    }
    

    increasePoints = (newPoint) => {
        console.log(newPoint);

        const pointsCopy = {...this.state.points};

        pointsCopy[`points${Date.now()}`] = newPoint;

        console.log(pointsCopy);

        this.setState({ points: pointsCopy });
    }

    decreasePoints = (oldPoint) => {

        const pointsCopy = {...this.state.points};

        delete pointsCopy[oldPoint];

        this.setState({ points: pointsCopy });

        console.log(oldPoint);
        
        fetch('/user-points', {
            method: 'POST',
            headers : new Headers(),
            body:JSON.stringify({ data: {toDelete: oldPoint }  })
        }).then((res) => res.json())
        .then((data) =>  console.log(data))
        .catch((err)=>console.log(err));

    }


    render() {

        return (
            <React.Fragment>
                <PointsForm stateLength={Object.keys(this.state.points).length} updatePoints={this.increasePoints}/>
                <PointsIndex points={this.state.points} updatePoints={this.decreasePoints}/>
                <PointsMap />
            </React.Fragment>
        );
    }
    

}

export default PointsDashboard;

