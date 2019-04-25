import React, { Component } from 'react';
import './App.css';
import CustomerTable from './components/CustomerTable';
import TrainingTable from './components/TrainingTable';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
      showTable: false
    }
  }
  
  async componentDidMount() {
  }

  onSearch = async () => {
    const {search} = this.state;
    await fetch(`https://customerrest.herokuapp.com/api/${search}`)
      .then(response => response.json())
      .then(result => {
        (search === "customers") 
        ? (this.setState({customers: result.content})) 
        : (this.setState({trainings: result.content}))
      })
      .catch(err => console.error(err))
    
    this.setState({showTable: true})

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
            onChange={(event) => this.setState({search: event.target.value})}
          >            
            <option value="" hidden>Choose your data</option>
            <option value="customers">Customers</option>
            <option value="trainings">Trainings</option>
          </select>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.onSearch}>
            SEARCH
          </Button>
        </div>  
        {showTable && 
          ((search === "customers") 
          ? (<CustomerTable 
              customers={this.state.customers}
            />)
          : (<TrainingTable 
              trainings={this.state.trainings}
            />))
        }
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App);
