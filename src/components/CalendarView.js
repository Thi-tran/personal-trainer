import React, { Component } from 'react'
import events from "../data/event";
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
            start: String(moment(event.date)._d),
            end: String(moment(event.date).add(event.duration, 'days')._d)
        })
        id ++;
    })
    return eventsUpdate;
}


export default class CalendarView extends Component {
    constructor(props) {
        super(props);
        this.state={
            events: []
        }   
    }
        
    componentDidMount() {
        fetch(`https://customerrest.herokuapp.com/api/customers/${this.props.customerID}/trainings`)
        .then(response => response.json())
        .then(result => {
            const events = transformEvents(result.content);
            this.setState({events});
        })
        .catch(err => console.log(err))
    }
    
    render() {
        const {events} = this.state;
        console.log(events)
        return (
            <div>
                <h2>Trainings of customer with ID {this.props.customerID}</h2>
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
