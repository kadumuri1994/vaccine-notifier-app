# Vaccine Notifier App 

## EmailJS configuration

- Sign up a free account on EmailJS (https://www.emailjs.com/). 
- Create new service using your gmail account (follow: https://dev.to/daliboru/how-to-send-emails-from-a-form-in-react-emailjs-27d1#:~:text=Go%20to%20the%20'Email%20Template,in%20our%20case%2C%20in%20React). 
- At the end of this process, you should have the service id, template id and user id values.

![image](https://user-images.githubusercontent.com/36915315/117040963-135b9c00-ad28-11eb-9ae2-4ff803c96d99.png)

![image](https://user-images.githubusercontent.com/36915315/117041977-0a1eff00-ad29-11eb-8c67-b2567c5aef6e.png)

[PS: Note that there is a limit of number of emails this service can send, so please ensure to set the age under 45 in the next steps, to get notified minimally]

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

![image](https://user-images.githubusercontent.com/36915315/117042622-d4c6e100-ad29-11eb-85ff-b9eccbca57e5.png)

![notification_screenshot](https://user-images.githubusercontent.com/36915315/117042144-3b97ca80-ad29-11eb-8759-5ac6d062d446.jpeg)
