import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import FlatButton from 'material-ui/FlatButton';

// TODO: update to the new form of react-table or find another solution

import AddTrainingForm from './AddTrainingForm';
// import EditCarForm from './EditCarForm';

class CustomerTable extends Component {
  render() {
    return (
      <div>
        <ReactTable
          filterable
          columns={[
            {
              Header: 'Firstname',
              accessor: 'firstname',
            },
            {
              Header: 'Lastname',
              accessor: 'lastname',
            },
            {
              Header: 'Address',
              accessor: 'streetaddress',
            },
            {
              Header: 'Post Code',
              accessor: 'postcode',
            },
            {
              Header: 'City',
              accessor: 'city',
            },
            {
              Header: 'Email',
              accessor: 'email',
            },
            {
              Header: 'Phone',
              accessor: 'phone',
            },
            {
              Header: '',
              accessor: 'links[0].href',
              filterable: false,
              Cell: ({ value }) => <AddTrainingForm customer={value} />,
            },
            {
              Header: '',
              accessor: 'links[0].href',
              filterable: false,
              Cell: ({ value }) => (
                <FlatButton
                  secondary={true}
                  label="Delete"
                  onClick={() => {
                    this.props.deleteCustomer(value);
                  }}
                />
              ),
            },
            // {
            //     Header: "",
            //     accessor: "_links.href",
            //     flterable: false,
            //     Cell: ({ row, value }) => (<EditCarForm link={value} car={row} editCar={this.props.editCar} />)
            // }
          ]}
          // defaultSorted={[
          //     {
          //         id: "firstname",
          //         desc: false,
          //     }
          // ]}
          defaultPageSize={15}
          data={this.props.data}
          className="-striped"
        />
      </div>
    );
  }
}

export default CustomerTable;
