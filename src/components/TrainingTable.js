import ReactTable from "react-table";
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import React, { Component } from 'react'

export default class TrainingTable extends Component {

  
  deleteTraining = (trainingID) => {
    if (window.confirm("Are you sure? ")) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${trainingID}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
      }).then(res => {
        this.props.fetchingData();
      }).catch(err => console.error(err));
    }
  }

  render() {
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
          Cell: value => <Button color="secondary" onClick={() => this.deleteTraining(value.row._original.id)}>Delete</Button>
      }, 
    ];
    return (
      <div className="table-template">
      <ReactTable
        data={this.props.trainings}
        defaultPageSize={10}
        columns={columns}
        filterable={true}
      />
    </div>
    )
  }
}