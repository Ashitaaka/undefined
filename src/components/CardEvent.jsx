import React from 'react'
import './CardEvent.css'
import localisation from '../assets/images/localisation-32px.png'

// function pour formater la date reçus
const formatDateNumber = (dateString) => {
  const optionsNumber = {day: 'numeric' };
  const date = new Date(dateString.replace('Z', ''));
  return date.toLocaleDateString('en-EN', optionsNumber);
};

const formatDateMonth = (dateString) => {
  const optionsMonth = {month: 'long' };
  const date = new Date(dateString.replace('Z', ''));
  return date.toLocaleDateString('en-EN', optionsMonth);
};

const CardEvent = ({ category, title, start, end, address }) => {

  const formattedStartDateNumber = formatDateNumber(start);
  const formattedStartDateMonth = formatDateMonth(start);
  const formattedEndDateNumber = formatDateNumber(end);
  const formattedEndDateMonth = formatDateMonth(end);

  return (

    <div className="card-event">
      <div className="info-background">
        <small className='category'>{category}</small>
        <h3 className='title'>{title}</h3>
        <div className='adress-group'>
          <img className='adress-img' src={localisation}/>
          <p className="address">{address}</p>
        </div>
      </div>

      <div className='date-background'>
        <div className='date'>
          <p className='date-day'>{formattedStartDateNumber}</p>
          <p className='date-month'>{formattedStartDateMonth}</p>
        </div>
        {formattedStartDateNumber === formattedEndDateNumber
        ? <p></p>
        : <p className='quote'>-</p> }
        {formattedStartDateNumber === formattedEndDateNumber
        ? <p className='end-date'></p>
        :  <div className='date'>
            <p className='date-day'>{formattedEndDateNumber}</p>
            <p className='date-month'>{formattedEndDateMonth}</p>
            </div>
        }
      </div>

    </div>
  );
};

export default CardEvent;
