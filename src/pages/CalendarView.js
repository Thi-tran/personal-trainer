import React, { Component } from 'react'

export default class CalendarView extends Component {
  render() {
    const events = [
        {
            start: '2015-07-20',
            end: '2015-07-02',
            eventClasses: 'optionalEvent',
            title: 'test event',
            description: 'This is a test description of an event',
        },
        {
            start: '2015-07-19',
            end: '2015-07-25',
            title: 'test event',
            description: 'This is a test description of an event',
            data: 'you can add what ever random data you may want to use later',
        },
    ];
     
    return (
      <div>
        
      </div>
    )
  }
}
