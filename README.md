# Vaccine Notifier App 

## EmailJS configuration

- Sign up on EmailJS (https://www.emailjs.com/). 
- Create new service using your gmail account (follow: https://dev.to/daliboru/how-to-send-emails-from-a-form-in-react-emailjs-27d1#:~:text=Go%20to%20the%20'Email%20Template,in%20our%20case%2C%20in%20React). 
- At the end of this process, you should have the service id, template id and user id values.

### Project Configuration (Windows)
- Enusre GIT and Node are installed on your machine
- Clone the project using following command: 'git clone https://github.com/kadumuri1994/vaccine-notifier-app.git'
- Navigate to the 'vaccine-notifier-app\src\constansts.js' and update the values of service id, template id and user id values. Also set the district ids for which you want the vaccine slots to check.

- Installation
    ```sh
    cd vaccine-notifier-app
    npm i
    npm start
    ```
- This should launch the app in browser. Click on Check Availability only once to subscribe to the email notifications (You can check the network trace in developer tools)