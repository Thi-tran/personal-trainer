import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const initialState = {
    firstname: '',
    lastname:'',
    postcode: '',
    streetaddress: '',
    email: '',
    phone: '',
    city: '',
    url: ''
}

export default class AddCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {  
        if (nextProps.url !== prevState.url) {
            return {
                firstname: nextProps.firstname,
                lastname: nextProps.lastname,
                postcode: nextProps.postcode,
                streetaddress: nextProps.streetaddress,
                email: nextProps.email,
                phone: nextProps.phone,
                city: nextProps.city,
                url: nextProps.url  
            }
        } else return null;
      }
      
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = () => {
        const {firstname, lastname, postcode, streetaddress, email, phone, city}  = this.state;
        const customer = {
            firstname,
            lastname,
            postcode,
            streetaddress,
            email,
            phone,
            city
        }

        if (this.props.current === "Add") {
            fetch('https://customerrest.herokuapp.com/api/customers', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            })
            .then(res => {
                this.props.fetchingData();
            })
            .catch(err => console.error(err));
        } else {
            fetch(this.state.url, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            })
            .then(res => {
                this.props.fetchingData();
            })
            .catch(err => console.error(err));
        }
        this.setState({...initialState})
        this.props.onHandleCloseDialog();
    }

    onHandleAddCustomer = () => {
        this.setState({openDialog: true})
        }

        onHandleCloseDialog = () => {
        this.setState({openDialog: false})
        }
  render() {
    const {firstname, lastname, postcode, streetaddress, email, phone, city}  = this.state;
    const {current} = this.props;
    return (
        <Dialog
        open={this.props.openDialog}
        onClose={this.props.onHandleCloseDialog}
        aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">{current} new customer</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Input Name, Address, Email, Phone of the customer
            </DialogContentText>

            <TextField
                autoFocus
                margin="dense"
                name="firstname"
                label="First Name"
                type="text"
                fullWidth
                value={firstname}
                onChange={this.handleChange}
            />
            <TextField
                margin="dense"
                name="lastname"
                label="Last Name"
                type="text"
                fullWidth
                value={lastname}
                onChange={this.handleChange}
            />
            <TextField
                margin="dense"
                name="streetaddress"
                label="Street address"
                type="text"
                fullWidth
                value={streetaddress}
                onChange={this.handleChange}
            />
            <TextField
                margin="dense"
                name="postcode"
                label="Postcode"
                type="number"
                fullWidth
                value={postcode}
                onChange={this.handleChange}
            />
            
            <TextField
                margin="dense"
                name="city"
                label="City"
                type="text"
                fullWidth
                value={city}
                onChange={this.handleChange}
            />
            <TextField
                margin="dense"
                name="email"
                label="Email address"
                type="text"
                fullWidth
                value={email}
                onChange={this.handleChange}
            />
            <TextField
                margin="dense"
                name="phone"
                label="Phone"
                type="number"
                fullWidth
                value={phone}
                onChange={this.handleChange}
            />

        </DialogContent>
        <DialogActions>
            <Button onClick={this.props.onHandleCloseDialog}>
                Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
            {current}
            </Button>
        </DialogActions>
    </Dialog>
    )
  }
}
