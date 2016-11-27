import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment-timezone';
moment.tz.setDefault('Europe/Warsaw');
window.moment = moment;
import DayPicker from "react-day-picker";

import {
  changeVisibleDay,
  selectEvent,
  addEvent,
  changeMadeWishes,
} from './actionCreators';
import DayDetails from './DayDetails';
import { showNotification } from './notifications';

import './Dashboard.css';
/*
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
*/
const Dashboard = (props) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="calendar">
        <div className="calendar-wrapper">
          <DayPicker
            modifiers={{
              active: (day) => moment(day).format('YYYY-MM-DD') === props.visibleDate,
              hasEvents: (day) => props.events.find(
                i => i.date === moment(day).format('YYYY-MM-DD')
              ),
            }}
            onDayClick={(e, day) => props.changeVisibleDay(day)}
          />
        </div>
        <div className="day-details-wrapper">
          <DayDetails 
            currentDay={props.visibleDate}
            events={props.currentDayEvents}
            onAdd={props.addEvent}
            changeMadeWishes={props.changeMadeWishes}
            sunriseSunset={props.sunriseSunset}
          />
          <button onClick={() => showNotification('Siema')}>
            Show sample notification
          </button>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({

  events: state.dashboard.calendar.events,
  currentDayEvents:state.dashboard.calendar.events.filter(
    i => i.date === state.dashboard.calendar.visibleDate
  ),
  visibleDate: state.dashboard.calendar.visibleDate,
  selectedEvent: state.dashboard.calendar.events.find(
    i => i.id === state.dashboard.calendar.selectedEventId
  ),
  sunriseSunset: state.dashboard.calendar.sunriseSunset,
});

const mapDispatchToProps = (dispatch) => ({
  changeVisibleDay: (day) => dispatch(changeVisibleDay(day)),
  selectEvent: (event) => dispatch(selectEvent(event)),
  addEvent: (data) => dispatch(addEvent(data)),
  changeMadeWishes: (id, data) => dispatch(changeMadeWishes(id, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
