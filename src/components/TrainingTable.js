import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import moment from 'moment';
// import EditCarForm from './EditCarForm';

class TrainingTable extends Component {
    render() {
        return (
            <div>
                <ReactTable
                    columns={[
                        {
                            Header: "Date",
                            accessor: "date",
                            Cell: ({value}) => (moment(value).format('DD/MM/YYYY')),
                        },
                        {
                            Header: "Duration",
                            accessor: "duration"
                        },
                        {
                            Header: "Activity",
                            accessor: "activity"
                        },
                        // {
                        //     Header: "",
                        //     accessor: "_links.href",
                        //     flterable: false,
                        //     Cell: ({ value }) => (
                        //         <button className="btn btn-sm btn-danger"
                        //             onClick={() => { this.props.deleteCar(value) }}
                        //         >
                        //             Delete
                        //         </button>
                        //     )
                        // },
                        // {
                        //     Header: "",
                        //     accessor: "_links.href",
                        //     flterable: false,
                        //     Cell: ({ row, value }) => (<EditCarForm link={value} car={row} editCar={this.props.editCar} />)
                        // }
                    ]}
                    defaultPageSize={10}
                    filterable
                    data={this.props.data}
                    className="-striped"
                />
            </div>
        );
    }
}

export default TrainingTable;