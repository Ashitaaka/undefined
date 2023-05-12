import React, { useEffect } from 'react'
import './CardEvent.css'
import { MdLocationOn } from 'react-icons/md'


// functionfor formating date with two const "dd" "mmmm"
const formatDateNumber = (dateString) => {
  const optionsNumber = {day: 'numeric' };
  const date = new Date(dateString.replace('Z', ''));
  return date.toLocaleDateString('en-EN', optionsNumber);
};

const formatDateMonth = (dateString) => {
  const optionsMonth = {year: 'numeric'};
  const date = new Date(dateString.replace('Z', ''));
  return date.toLocaleDateString('en-EN', optionsMonth);
};

const formatDateYears = (dateString) => {
  const optionsYears = {month: 'long' };
  const date = new Date(dateString.replace('Z', ''));
  return date.toLocaleDateString('en-EN', optionsYears);
};

const CardEvent = ({ category, title, start, end, address }) => {

  const formattedStartDateNumber = formatDateNumber(start);
  const formattedStartDateMonth = formatDateMonth(start);
  const formattedEndDateNumber = formatDateNumber(end);
  const formattedEndDateMonth = formatDateMonth(end);
  const formatttedDateYear = formatDateYears(start)

  return (

    
    <div className="card-event">
        
            <div className="info-background">
            <div>
              <small className={category !== "severe-weather" ? "category" : "category-danger"}>{category}</small>
              <p className='title-card'>{title}</p>
          </div>
          <div>
            <div className={address !== "Address not available" ? 'adress-group' : "hide"}>
              <MdLocationOn className="adress-img"/>
              <p className="address">{address}</p>
          </div>
        </div>
      </div>

      <div className={category !== "severe-weather" ? "date-background" : "date-background-danger"}>
        <div className='date'>
          <p className='date-day'>{formattedStartDateNumber}</p>
          <p>{formatttedDateYear}</p>
          <p className='date-month'>{formattedStartDateMonth}</p>
        </div>
        {formattedStartDateNumber === formattedEndDateNumber
        ? <p></p>
        : <p className='quote'>-</p> }
        {formattedStartDateNumber === formattedEndDateNumber
        ? <p className='end-date'></p>
        :  <div className='date'>
            <p className='date-day'>{formattedEndDateNumber}</p>
            <p>{formatttedDateYear}</p>
            <p className='date-month'>{formattedEndDateMonth}</p>
            </div>
            
        }
      </div>

    </div>
  );
};

export default CardEvent;
