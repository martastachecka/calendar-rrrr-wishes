import moment from 'moment-timezone';
moment.tz.setDefault('Europe/Warsaw');
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,

  CHANGE_VISIBLE_DAY,

  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,

  ADD_EVENT,
  CHANGE_MADE_WISHES,
  FETCH_SUNRISE_SUNSET_REQUEST,
  FETCH_SUNRISE_SUNSET_FAILURE,
  FETCH_SUNRISE_SUNSET_SUCCESS,

  CHECK_LOGIN_REQUEST,
  CHECK_LOGIN_FAILURE,
  CHECK_LOGIN_SUCCESS
} from './actionTypes';

// Login Actions
export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data,
});

export const loginFailure = () => ({ type: LOGIN_FAILURE });
export const logOut = () => ({ type: LOG_OUT });

//Calendar Actions

export const fetchSunriseSunsetRequest = () => ({ type: FETCH_SUNRISE_SUNSET_REQUEST });
export const fetchSunriseSunsetSuccess = (data) => ({
  type: FETCH_SUNRISE_SUNSET_SUCCESS,
  data,
});
export const fetchSunriseSunsetFailure = (data) => ({
  type: FETCH_SUNRISE_SUNSET_FAILURE,
  data,
});

export const fetchSunriseSunset = day => (dispatch, getState) => {
  const fetchForDay = day || getState().dashboard.calendar.visibleDate;
  dispatch(
    fetchSunriseSunsetRequest(fetchForDay)
  );

  fetch(`http://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=${fetchForDay}`)
    .then(response => response.json())
    .then(data => dispatch(fetchSunriseSunsetSuccess(data.results)))
    .catch(error => dispatch(fetchSunriseSunsetFailure(error)));
}

export const changeVisibleDay = (data) => dispatch => {
  const formatedDate = moment(data).format('YYYY-MM-DD');

  dispatch({
    type: CHANGE_VISIBLE_DAY,
    data: formatedDate,
  });

  fetchSunriseSunset(formatedDate);
}

export const fetchEventsRequest = () => ({ type: FETCH_EVENTS_REQUEST });
export const fetchEventsSuccess = (data) => ({
  type: FETCH_EVENTS_SUCCESS,
  data,
});
export const fetchEventsFailure = (data) => ({
  type: FETCH_EVENTS_FAILURE,
  data,
});

export const fetchEvents = () => (dispatch, getState) => {
  if (getState().dashboard.calendar.events.length) { return null; }

  dispatch(fetchEventsRequest());

  fetch(`${process.env.PUBLIC_URL}/data/events.json`)
    .then(response => response.json())
    .then(events => dispatch(fetchEventsSuccess(events)))
    .catch(error => dispatch(fetchEventsFailure(error)));
}

export const addEvent = (data) => (dispatch, getState) => dispatch({
  type: ADD_EVENT,
  data: {
    ...data,
    id: getState().dashboard.calendar.events.slice().pop().id + 1,
    date: getState().dashboard.calendar.visibleDate,
  }
});

export const changeMadeWishes = (id, madeWishes) => ({
  type: CHANGE_MADE_WISHES,
  id,
  madeWishes,
})

export const checkLogin = (replace) => (dispatch, getState) => {
  dispatch({ type: CHECK_LOGIN_REQUEST });

  if(getState().dashboard.userData.name) {
    dispatch({ type: CHECK_LOGIN_SUCCESS });
  } else {
    dispatch({ type: CHECK_LOGIN_FAILURE });
    replace('/');
  }
}