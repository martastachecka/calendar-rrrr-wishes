import React from 'react';
import moment from 'moment-timezone';
moment.tz.setDefault('Europe/Warsaw');
import AddEvent from '../AddEvent';
import nameDay from '../nameday';

const getDayNumber = (now) => {
	const start = new Date(now.getFullYear(), 0, 0);
	const diff = now - start;
	const oneDay = 1000 * 60 * 60 * 24;
	return Math.floor(diff / oneDay);
}

const SingleEvent = ({ eventData, changeMadeWishes }) => (
	<div className="single-event">
		<p>Title: {eventData.title}</p>
		<p>Type: {eventData.type}</p>
		<p>description: {eventData.description}</p>
		<p>Made wishes?: 
			<input
				type="checkbox"
				defaultChecked={eventData.madeWishes}
				onChange={(e) => changeMadeWishes(
					eventData.id,
					!eventData.madeWishes
				)}
			/>
		</p>
	</div>
);

const DayDetails = ({ currentDay, events, onAdd, changeMadeWishes, sunriseSunset }) => (
	<div className="day-details">
		<h2>Day: {moment(currentDay, 'YYYY-MM-DD').format('MMMM Do YYYY')}</h2>
		<p>Number: {getDayNumber(moment(currentDay, 'YYYY-MM-DD').toDate())}</p>
		<p>Sunrise: {sunriseSunset.sunrise}</p>
		<p>Sunset: {sunriseSunset.sunset}</p>
		<h3>Name day:</h3>
		{nameDay['day_' + moment(currentDay, 'YYYY-MM-DD').format('DDMM')]}
		<h3>Events:</h3>
		{events.map(i => (
			<SingleEvent
				key={i.id}
				eventData={i} 
				changeMadeWishes={changeMadeWishes}
			/>
		))}
		<h3>Add event:</h3>
		<AddEvent onAdd={onAdd} />
	</div>
);

export default DayDetails;
