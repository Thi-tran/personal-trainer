import React, { Component } from 'react'

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
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

export default class FindTraining extends Component {
    constructor(props) {
        super(props);
        this.state= {
            customers: []
        }
    }
    
    componentDidMount() {
        fetch(`https://customerrest.herokuapp.com/api/customers`)
        .then(response => response.json())
        .then(result => {this.setState({customers: result.content})})
        .catch(err => console.error(err))
    }
  render() {
      const {customers} = this.state;
    return (
        <Dialog
        open={this.props.openFindCustomer}
        onClose={this.props.onHandleCloseFindTraining}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">View trainings of</DialogTitle>
        <FormControl style={{width: '90%',   textAlign: 'center', margin: 'auto'}}>
            <InputLabel htmlFor="select-multiple">Customer name</InputLabel>
            <Select
                value={this.props.customerURL}
                onChange={this.props.onChangeCustomerURL}
                input={<Input id="select-multiple" />}
                MenuProps={MenuProps}
            >
                {customers.map(customer => (
                <MenuItem key={customer.links[1].href} value={customer.links[1].href}>
                    {customer.firstname} {customer.lastname}
                </MenuItem>
                ))}
            </Select>
        </FormControl>
        <DialogActions>
          <Button onClick={this.props.onHandleCloseFindTraining}>
            Cancel
          </Button>
          <Button onClick={this.props.onSubmitFindCustomerTraining} color="primary">
            Find trainings
          </Button>
        </DialogActions>
      </Dialog>

    )
  }
}
