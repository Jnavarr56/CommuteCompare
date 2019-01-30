import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import {} from 'jquery-ujs';


class CommuteTable extends React.Component {

    constructor() {
        super();
        this.state = {};

    }


    downloadAsCSV = () => {

        let data = [];
    
        $('tr').each(function() {

            let row = [];

            let x = 0;
    
            $(this).children().each(function() {

                if (x > 5) {

                    row.push($(this).text().replace(/,/g, ''));
                    row.push($(this).text().replace(/,/g, ''));        

                }

                else {

                    row.push($(this).text().replace(/,/g, ''));  

                }

                x ++;
            });

            data.push(row);

        });

        let csv = '';
    
        data.forEach(function(row) {
                csv += row.join(',');
                csv += "\n";
        });
     
        
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'your_apartment_data.csv';
        hiddenElement.click();
    }


    render() {

        

        return (

                
                <div id="tableID" className="bg-dark table-list-container">
                    <button onClick={this.downloadAsCSV} className="btn btn-primary">Export To CSV</button>
                    <table className="table table-bordered table-list">
                        <TableHeader rows={this.props.tableData.rows} headerData1={this.props.tableData.header} headerData2={this.props.tableData.header2}/>
                        <tbody className="list">
                            {this.props.tableData.rows.map(row => <TableRow key={row[0]} rowData={row} headerData2={this.props.tableData.header2} headerData1={this.props.tableData.header}/>)}
                        </tbody>
                    </table>
                </div>


                

            
        );

    }
    

}

export default CommuteTable;

