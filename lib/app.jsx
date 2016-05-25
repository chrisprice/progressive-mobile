import Calendar from './calendar/calendar';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Calendar date={new Date()}/>, document.querySelector('.calendar'));
