import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import moment from 'moment';
import FlatButton from 'material-ui/FlatButton';
// import Dialog from 'material-ui/Dialog';

import EditTrainingForm from './EditTrainingForm';

class TrainingTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            // deleteDialogIsOpen: false,
            // valueToDelete: '',
        };

        // this.handleCloseDialog = this.handleCloseDialog.bind(this);
        // this.handleConfirmAction = this.handleConfirmAction.bind(this);
    }

    // handleOpenDeleteDialog = (value) => {
    //     this.setState({ 
    //         deleteDialogIsOpen: true,
    //         valueToDelete: value
    //     });
    // };

    // handleCloseDialog = () => {
    //     this.setState({ deleteDialogIsOpen: false });
    // };

    // handleConfirmAction = () => {
    //     this.handleCloseDialog();
    //     this.props.deleteTraining(this.state.valueToDelete)
    // }

    render() {
        // const actions = [
        //     <FlatButton
        //         label="Cancel"
        //         onClick={() => this.handleCloseDialog}
        //     />,
        //     <FlatButton
        //         label="Delete"
        //         onClick={() => this.handleConfirmAction}
        //     />,
        // ];

        return (
            <div>
                <ReactTable
                    columns={[
                        {
                            Header: "Activity",
                            accessor: "activity"
                        },
                        {
                            Header: "Customer Name",
                            accessor: "customer"
                        },
                        {
                            Header: "Date",
                            accessor: "date",
                            Cell: ({value}) => (moment(value).format('DD/MM/YYYY')),
                        },
                        {
                            Header: "Time",
                            accessor: "date",
                            Cell: ({ value }) => (moment(value).format('HH:mm'))
                        },
                        {
                            Header: "Duration (mins)",
                            accessor: "duration"
                        },
                        {
                            Header: "",
                            accessor: "links[0].href",
                            filterable: false,
                            Cell: ({ value }) => (
                                <FlatButton secondary={true}
                                    label="DELETE"
                                    onClick={() => { this.props.deleteTraining(value) }}
                                    // onClick={() => this.handleOpenDeleteDialog(value)}
                                />
                            )
                        },
                        {
                            Header: "",
                            accessor: "links[0].href",
                            filterable: false,
                            Cell: ({ row, value }) => (<EditTrainingForm link={value} training={row} editTraining={this.props.editTraining} />)
                        }
                    ]}
                    defaultPageSize={15}
                    filterable
                    data={this.props.data}
                    className="-striped"
                />
                {/* <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.deleteDialogIsOpen}
                    onRequestClose={this.handleCloseDialog}
                >
                    Delete this record?
                </Dialog> */}
            </div>
        );
    }
}

export default TrainingTable;