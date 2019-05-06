import React, { Component } from 'react'
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dates from '../utils/dates';

moment.locale("fi");
const localizer = BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);


const transformEvents = (events) => {
    const eventsUpdate = [];
    let id = 0;
    events.forEach(event => {
        eventsUpdate.push({
            id,
            title: event.activity,
            start: moment(event.date)._d,
            end: moment(event.date).add(event.duration, 'days')._d
        })
        id ++;
    })
    return eventsUpdate;
}


export default class CalendarView extends Component {
    constructor(props) {
        super(props);
        this.state={
            events: [],
            customer: {}
        }   
    }
        
    componentDidMount() {
        fetch(`${this.props.customerURL}/trainings`)
        .then(response => response.json())
        .then(result => {
            const events = transformEvents(result.content);
            this.setState({events});
        })
        .catch(err => console.log(err))

        fetch(`${this.props.customerURL}`)
        .then(response => response.json())
        .then(customer => this.setState({customer}))
        .catch(err => console.log(err))
    }
    
    render() {
        const {events} = this.state;
        console.log(events)
        return (
            <div>
                <h2>Trainings of {this.state.customer.firstname} {this.state.customer.lastname}</h2>
                <div style={{height: 700}}>
                    <BigCalendar
                        localizer={localizer}
                        views={allViews}
                        step={60}
                        showMultiDayTimes
                        events={events}
                        max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </div>
            </div>
        )
    }
}
