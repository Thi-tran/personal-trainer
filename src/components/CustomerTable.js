import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
const CustomerTable = props => {
  const columns = [
    {
        Header: "Name",
        accessor: "firstname" // String-based value accessors!
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
        Header: "Trainings",
        filterable: false,
        sortable: false,
        accessor: "_links.self.href",
        Cell: value => <Button color="secondary" onClick={() => console.log(value)}>Delete</Button>
    }, 
    // {
    //   Header: "",
    //   accessor: "date",
    //   sortable: false,
    //   filterable: false,
    //   Cell: row => <button onClick={() => props.deleteTodo(row)}>Delete</button>
    // }
  ];
  return (
    <div className="table-template">
      <ReactTable
        data={props.customers}
        defaultPageSize={10}
        columns={columns}
        filterable={true}
      />
    </div>
  );
};

export default CustomerTable;
