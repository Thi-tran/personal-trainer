import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  
const initialState = {
    date:'',
    activity:'',
    duration: '',
    customer: []
}

export default class AddTraining extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
            listCustomers: [],
        }
    }

    async componentDidMount() {
        await fetch(`https://customerrest.herokuapp.com/api/customers`)
        .then(response => response.json())
        .then(result => {this.setState({listCustomers: result.content})})
        .catch(err => console.error(err))
  
    }
      
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChangeCustomer = (event) => {
        this.setState({customer: event.target.value})
    };

    onSubmit = () => {     
        const {date, activity, duration, customer}  = this.state;
        const newTraining = {
            date, activity, duration, customer
        }

        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
        .then(res => {
            this.props.fetchingData();
        })
        .catch(err => console.error(err));

        this.setState({...initialState})
        this.props.onHandleCloseAddTraining();
    }

  render() {
    const {date, activity, duration, customer, listCustomers}  = this.state;

    return (
        <Dialog
            open={this.props.addTraining}
            onClose={this.props.onHandleCloseAddTraining}
            aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Add new training</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Input date, activity, duration and customers
            </DialogContentText>

            <TextField
                autoFocus
                margin="dense"
                name="date"
                label="Date"
                type="text"
                fullWidth
                value={date}
                onChange={this.handleChange}
            />
            <TextField
                margin="dense"
                name="activity"
                label="Activity"
                type="text"
                fullWidth
                value={activity}
                onChange={this.handleChange}
            />
            <TextField
                margin="dense"
                name="duration"
                label="Duration"
                type="text"
                fullWidth
                value={duration}
                onChange={this.handleChange}
            />

            <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple">Input customers</InputLabel>
                <Select
                    value={customer}
                    onChange={this.handleChangeCustomer}
                    input={<Input id="select-multiple" />}
                    MenuProps={MenuProps}
                >
                    {listCustomers.map(customer => (
                    <MenuItem key={customer.links[1].href} value={customer.links[1].href}>
                        {customer.firstname}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
    

        </DialogContent>
        <DialogActions>
            <Button onClick={this.props.onHandleCloseAddTraining}>
                Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
                Add Training
            </Button>
        </DialogActions>
    </Dialog>
    )
  }
}
