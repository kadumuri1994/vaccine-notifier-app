import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import moment from 'moment'
import notifier from './notifier'

function App() {
  return (
    <div className="App">
      <button onClick={checkAvailability}>Check Availability</button>
    </div>
  );
}

async function checkAvailability() {
  let datesArray = await fetchNext10Days();
  datesArray.forEach(date => {
      getSlotsForDate(date);
  })
}

function getSlotsForDate(DATE) {
  let districts = [681, 703]
  districts.forEach(district => {
  let config = {
      method: 'get',
      url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=' + district + '&date=' + DATE,
      headers: {
          'accept': 'application/json',
          'Accept-Language': 'hi_IN'
      }
  };

  axios(config)
      .then(function (slots) {
          let sessions = slots.data.sessions;
          let validSlots = sessions.filter(slot => slot.min_age_limit <= 26 &&  slot.available_capacity > 0)
          console.log({date:DATE, validSlots: validSlots.length})
          if(validSlots.length > 0) {
              notifyMe(validSlots);
          }
      })
      .catch(function (error) {
          console.log(error);
      });
  })
}

async function fetchNext10Days(){
  let dates = [];
  let today = moment();
  for(let i = 0 ; i < 10 ; i ++ ){
      let dateString = today.format('DD-MM-YYYY')
      dates.push(dateString);
      today.add(1, 'day');
  }
  return dates;
}

function notifyMe(validSlots){
  let slotDetails = JSON.stringify(validSlots, null, '\t');
  console.log(slotDetails)
  notifier.sendEmail('vamshi1000@gmail.com', 'VACCINE AVAILABLE', slotDetails, (err, result) => {
      if(err) {
          console.error({err});
      }
  })
};

export default App;
