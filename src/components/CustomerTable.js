import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import EditCustomer from '../components/AddCustomer';
export default class CustomerTable extends Component {
  constructor(props) {
    super(props);
    this.state={
      openDialog: false,
      current: 'Edit',
      firstname: '',
      lastname:'',
      postcode: '',
      streetaddress: '',
      email: '',
      phone: '',
      city: '',
      url: ''
    }
  }

  onHandleEditCustomer = (value) => {
    const {firstname, lastname, postcode, streetaddress, email, phone, city}  = value;
    const url = value.links[0].href;
    this.setState({
      openDialog: true,
      firstname,
      lastname,
      postcode,
      streetaddress,
      email,
      phone,
      city, 
      url
    })
    console.log(value);
  }

  onHandleCloseDialog = () => {
    this.setState({openDialog: false})
  }

  onDeleteCustomer = (value) => {
    if (window.confirm("Are you sure? ")) {
      fetch(value.links[0].href, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(res => {
          this.props.fetchingData();
      })
      .catch(err => console.error(err));
    }
  }
  render() {
    const columns = [
      {
          Header: "Name",
          accessor: "firstname", // String-based value accessors!
          Cell: props => <span>{props.original.firstname} {props.original.lastname}</span> // Custom cell components!
      },
      {
          Header: "Address",
          accessor: "streetaddress",
      },
      {
          Header: "Email",
          accessor: "email",
  
      },
      {
          Header: "Phone",
          accessor: "phone",
      },
      {
        Header: "",
        filterable: false,
        sortable: false,
        accessor: "_links.self.href",
        Cell: value => <Button color="primary" onClick={() => this.onHandleEditCustomer(value.row._original)}>Edit</Button>
      },
      {
          Header: "",
          filterable: false,
          sortable: false,
          accessor: "_links.self.href",
          Cell: value => <Button color="secondary" onClick={() => this.onDeleteCustomer(value.row._original)}>Delete</Button>
      }, 
    ];

    const {firstname, lastname, postcode, streetaddress, email, phone, city, url}  = this.state;
    return (
      <div className="table-template">
        <ReactTable
          data={this.props.customers}
          defaultPageSize={10}
          columns={columns}
          filterable={true}
        /> 

        <EditCustomer
          onHandleCloseDialog={this.onHandleCloseDialog}
          openDialog={this.state.openDialog}
          fetchingData={this.props.fetchingData}
          current={this.state.current}
          firstname={firstname}
          lastname={lastname}
          postcode={postcode}
          streetaddress={streetaddress}
          email={email}
          phone={phone}
          city={city}
          url={url}
        />
      </div>
    )
  }
}