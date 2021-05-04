import './App.css';
import { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { send } from 'emailjs-com'
import { DISTRICTS, SERVICE_ID, TEMPLATE_ID, USER_ID, POLL_TIME, AGE } from './constants'

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false)

  function checkAvailability() {
    setIsSubscribed(true)
    setInterval(() => {
      let today = moment()
      let date = today.format('DD-MM-YYYY')
      getSlotsForDate(date);
    }, POLL_TIME * 60 * 1000)
  }

  return (
    <div className="App">
      <div>
        <h4>
          Click below to subscribe the slot availability on your email
        </h4>
      </div>
      <div>
        <button onClick={checkAvailability} disabled={isSubscribed}>Check Availability</button>
      </div>
      <div>
        {isSubscribed && <p>Subscribed!</p>}
      </div>

    </div>
  );
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
        for (let i = 0; i < centers.length; i++) {
          let center = centers[i]
          let sessions = center.sessions
          for (let j = 0; j < sessions.length; j++) {
            let session = sessions[j]
            if (session.min_age_limit <= AGE && session.available_capacity > 0) {
              validSlots.push({
                district_name: center.district_name,
                name: center.name,
                pincode: center.pincode,
                block_name: center.block_name,
                available_capacity: session.available_capacity,
                date: session.date,
              })
            }
          }
        }
        if (validSlots.length > 0) {
          notifyMe(validSlots)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  })
}

function notifyMe(validSlots) {
  let slotDetails = JSON.stringify(validSlots, null, '\t')
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
      console.log('SUCCESS!', response.status, response.text)
    })
    .catch((err) => {
      console.log('FAILED...', err)
    })
}

export default App;
