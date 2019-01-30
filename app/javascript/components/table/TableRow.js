import React from 'react';
import {} from 'jquery-ujs';


class TableRow extends React.Component {

    constructor() {
        super();
        this.state = {};

    }

    stringToTime = (str) =>  {

        let arr = str.split(' ');

        if (arr.length === 4) {

            return (Number(arr[0])*60) + Number(arr[2]);

        }

        if (arr.length === 2 && (arr[1] === 'mins' || arr[1] === 'min' )) {

            return Number(arr[0]);

        }

        if (arr.length === 2 && (arr[1] === 'hour' || arr[1] === 'hours')) {

            return Number(arr[0])*60;

        }

    }


    render() {

        return (

            <tr className="table-light">
                {this.props.rowData.map((col, i) => {
                
                    if (i === 0) {

                        return <th className="apartmentaddress bg-primary" scope="row" key={i}>{col}</th>

                    }

                    else if (i < 6) {

                        return <th className={this.props.headerData1[i].toLowerCase().replace(/[\W_]+/g, "").replace('mo', '')} scope="row" key={i}>{col}</th>
                    }

                    else {

                        if (this.props.headerData2[i].toLowerCase()[0] === 't') {

                            return <td key={i} className={`${this.props.headerData2[i].toLowerCase()[0]}${i}`} data-duration={this.stringToTime(col)}>{col}</td>

                        }

                        else if (this.props.headerData2[i].toLowerCase()[0] === 'd') {

                            return <td key={i} className={`${this.props.headerData2[i].toLowerCase()[0]}${i}`}>{col}</td>

                        }

                        
                    }
                    
                
                })}
            </tr>
            
        );

    }
    

}

export default TableRow;

