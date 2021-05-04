import './App.css';
import axios from 'axios'
import moment from 'moment'
import { send } from 'emailjs-com'
import {DISTRICTS, SERVICE_ID, TEMPLATE_ID, USER_ID, POLL_TIME, AGE} from './constants'

function App() {
  return (
    <div className="App">
      <div>Click on the below button to check availability and notify for any available slots</div>
      <button onClick={checkAvailability}>Check Availability</button>
    </div>
  );
}

function checkAvailability() {
  setInterval(() => {
    let datesArray = fetchNext7Days();
    datesArray.forEach(date => {
        getSlotsForDate(date);
    })
  }, POLL_TIME * 60 * 1000)
}

function getSlotsForDate(date) {
  DISTRICTS.forEach(district => {
  let config = {
      method: 'get',
      url: '/api/v2/appointment/sessions/public/calendarByDistrict?district_id=' + district + '&date=' + date,
  };

  axios(config)
      .then(function (resp) {
          let centers = resp.data.centers
          let validSlots = []
          for(let i = 0; i < centers.length; i++) {
            let center = centers[i]
            let sessions = center.sessions
            for(let j = 0; j < sessions.length; j++) {
              let session = sessions[j]
              if(session.min_age_limit <= AGE && session.available_capacity > 0) {
                validSlots.push({
                  district_name: center.district_name,
                  block_name: center.block_name,
                  available_capacity: session.available_capacity,
                  date: session.date,
                })
              }
            }
          }
          if(validSlots.length > 0) {
              notifyMe(validSlots);
          }
      })
      .catch(function (error) {
          console.log(error);
      });
  })
}

function fetchNext7Days(){
  let dates = [];
  let today = moment();
  for(let i = 0 ; i < 7 ; i ++ ){
      let dateString = today.format('DD-MM-YYYY')
      dates.push(dateString);
      today.add(1, 'day');
  }
  return dates;
}

function notifyMe(validSlots){
  let slotDetails = JSON.stringify(validSlots, null, '\t');
  send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: 'Vaccine Notifier App',
      message: slotDetails
    },
    USER_ID
  )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    })
    .catch((err) => {
      console.log('FAILED...', err);
    });
};

export default App;
