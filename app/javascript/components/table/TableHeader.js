import React from 'react';
import {} from 'jquery-ujs';


class TableHeader extends React.Component {

    constructor() {
        super();
        this.state = {};
        

    }

    render() {

        return (

                
            <thead className="thead-dark">
                <tr>
                    {this.props.headerData1.map((x,i) => {
        
                         return <th key={`h1${i}`} className={x[0] === "@" ? 'bg-warning' : 'sort'} data-sort={x[0] === "@" ? '' : x.toLowerCase().replace(/[\W_]+/g, "").replace('mo', '')} colSpan={x[0] === "@" ? 2 : 1} scope="col">{x[0] === "@" ? x.slice(1) : x.slice(0)}</th>
                         
                    })}
                </tr>
                <tr>
                    {this.props.headerData2.map((x,i) => {

                        if (x.length !== 0) {

                            return <th key={ `h2${i}`} className="sort" data-sort={x == 'Time' ? `t${i}` : `d${i}`} scope="col">{x === '' ? '' : x}</th>

                        }

                        else {

                            return <th key={`h2${i}`} scope="col">{x === '' ? '' : x}</th>

                        }
                        
                    })}
                </tr>
            </thead>
                
     
        );

    }
    

}

export default TableHeader;

