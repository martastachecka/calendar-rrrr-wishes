import moment from 'moment-timezone';
moment.tz.setDefault('Europe/Warsaw');
import { combineReducers } from 'redux';
import {
  LOGIN_SUCCESS,
  LOG_OUT,
  FETCH_EVENTS_SUCCESS,
  CHANGE_VISIBLE_DAY,
  ADD_EVENT,
  CHANGE_MADE_WISHES,
  FETCH_SUNRISE_SUNSET_SUCCESS,
} from './actionTypes';

const userDataInitialState = {};
const userData = (state = userDataInitialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return action.data;
    case LOG_OUT:
      return userDataInitialState;
    default:
      return state;
  }
};

const eventInitialState = {};
const event = (state = eventInitialState, action) => {
  switch(action.type) {
    case CHANGE_MADE_WISHES:
      if (action.id !== state.id) { return state; }

      return {
        ...state,
        madeWishes: action.madeWishes,
      }
    default:
      return state;
  }
}

const eventsInitialState = [];
const events = (state = eventsInitialState, action) => {
  switch(action.type) {
    case FETCH_EVENTS_SUCCESS:
      return action.data;
    case ADD_EVENT:
      return [...state, action.data];
    case CHANGE_MADE_WISHES:
      return state.map(i => event(i, action));
    default:
      return state;
  }
}

const visibleDateInitialState = moment().format('YYYY-MM-DD');
const visibleDate = (state = visibleDateInitialState, action) => {
  switch(action.type) {
    case CHANGE_VISIBLE_DAY:
      return action.data;
    default:
      return state;
  }
}

const userListInitialState = [];
const userList = (state = userListInitialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return [...state, {
        name: action.data.name
      }];
    default:
      return state;
  }
}

const sunriseSunsetInitialState = {};
const sunriseSunset = (state = sunriseSunsetInitialState, action) => {
  switch (action.type) {
    case FETCH_SUNRISE_SUNSET_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

const calendar = combineReducers({
  events,
  visibleDate,
  sunriseSunset,
});

export default combineReducers({
  userData,
  calendar,
  userList,
});
