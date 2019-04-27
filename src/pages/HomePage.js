import React, { Component } from 'react';
import CustomerTable from '../components/CustomerTable';
import TrainingTable from '../components/TrainingTable';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCustomer from '../components/AddCustomer';
import AddTraining from '../components/AddTraining';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginBottom: '10',
  },
  input: {
    display: 'none',
  },
});


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      trainings: [],
      search: '',
      showTable: false,
      openDialog: false,
      addTraining: false,
      current: 'Add'
    }
  }
  
  fetchingData = async() => {
    const {search} = this.state;

    if (search === "customers") {
      await fetch(`https://customerrest.herokuapp.com/api/customers`)
        .then(response => response.json())
        .then(result => {this.setState({customers: result.content})})
        .catch(err => console.error(err))
    } else {
      await fetch(`https://customerrest.herokuapp.com/gettrainings`)
        .then(response => response.json())
        .then(result => {this.setState({trainings: result})})
        .catch(err => console.error(err))
    }

  }

  onSearch = async () => {
    this.fetchingData();
    this.setState({showTable: true})
  }

  onHandleChangeSearch = (event) => {
    this.setState({search: event.target.value})
    this.setState({showTable: false})
  }

  onHandleCloseAddTraining = () => {
    this.setState({addTraining: false});
  }

  onHandleCloseDialog = () => {
    this.setState({openDialog: false});
  }

  render() {
    const { classes } = this.props;
    const {search, showTable} = this.state;
    return (
      <div className="App">
        <div className="header justify-content-between d-flex mx-auto">
            <h1 className="mx-auto header-title">Personal Trainer Database</h1>
        </div>
        
        <div className="">
          <select 
            className="custom-select" 
            style={{width: '40%'}} 
            value={this.state.search} 
            onChange={(event) => this.onHandleChangeSearch(event)}
          >            
            <option value="" hidden>Choose your data</option>
            <option value="customers">Customers</option>
            <option value="trainings">Trainings</option>
          </select>
          <Button variant="contained" className={classes.button} onClick={this.onSearch}>
            SEARCH
          </Button>
        </div>  
        <Button variant="contained" color="primary" className={classes.button} onClick={() => {this.setState({openDialog: true})}}>
          ADD Customer
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} onClick={() => {this.setState({addTraining: true})}}>
          ADD Trainings
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => {console.log('clicked')}}>
          Calendar View
        </Button>


        {showTable && 
          ((search === "customers") 
          ? (<CustomerTable 
              customers={this.state.customers}
              fetchingData={this.fetchingData}
            />)
          : (<TrainingTable 
              trainings={this.state.trainings}
              fetchingData={this.fetchingData}
            />))
        }
        <AddCustomer 
          onHandleCloseDialog={this.onHandleCloseDialog} 
          openDialog={this.state.openDialog}  
          fetchingData={this.fetchingData}
          current={this.state.current}
        />

        <AddTraining 
          onHandleCloseAddTraining={this.onHandleCloseAddTraining} 
          addTraining={this.state.addTraining}  
          fetchingData={this.fetchingData}
        />
        
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App);
