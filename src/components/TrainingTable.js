import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import moment from 'moment';
const TrainingTable = props => {

  const deleteTraining = (link) => {
    if (window.confirm("Are you sure? ")) {
      fetch(link, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
      }).then(res => {
        props.fetchingData();
      }).catch(err => console.error(err));
    }
  }
  
  const columns = [
    {
        Header: "Activity",
        accessor: "activity" // String-based value accessors!
    },
    {
        Header: "Duration",
        accessor: "duration",
    },
    {
      Header: "Date",
      accessor: "date",
      Cell: props => <span className='number'>{moment(props.value).format("D MMM YYYY")}</span> // Custom cell components!
    },
    {
      Header: "Customer",
      accessor: "customer",
      Cell: props => <span className='number'>{props.value.firstname} {props.value.lastname}</span> // Custom cell components!
    },
    {
        Header: "",
        filterable: false,
        sortable: false,
        accessor: "_links.self.href",
        Cell: value => <Button color="secondary" onClick={() => deleteTraining(value.row._original.links[0].href)}>Delete</Button>
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
        data={props.trainings}
        defaultPageSize={10}
        columns={columns}
        filterable={true}
      />
    </div>
  );
};

export default TrainingTable;
