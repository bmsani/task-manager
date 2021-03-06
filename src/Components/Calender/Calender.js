import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calender = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div className='grid justify-center mt-7'>
            <Calendar onChange={onChange} value={value} />
        </div>
    );
};

export default Calender;