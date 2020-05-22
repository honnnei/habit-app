# habit-app
### Project Name :  Habit Tracker
Hanna, Huseyin, Steven, James

### Project Brief / User Stories:
* To build a habit tracker where a user can login, add a habit and how much they would like to track it, and then as the day progresses they can tick it off and their daily progress would accumulate. The data should be persistent so if a user logs off and back in it should be as it were.

* I want to be able to login and logout
* I want to be able to create a habit and the frequency of tracking
* I want to be able to mark things as being done
* I want to be able to delete habits (in case of a typo or I no longer want to track it)
* I want my total progress and habit specific progress shown to me in an easy to understand way


### To start (instructions on how to initialise App)

In the top level directory run:
```
npm start
```
This should launch your browser with the app (on http://localhost:3000)

* Note if you run into errors on running you may have to install dependencies, to do this run the command below in both the top level and "client" directories
```
npm install
```

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Running tests
The command is as below, to run server tests execute this command in top level, to run React (frontend) tests run this in the "client" folder

```
npm test
```
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Technology
* React
* NodeJS
* Mocha & Chai
* Jest & Enzyme
* Bootstrap

## Issues & solutions
* <Router /> tag can only be use once in the App, otherwise the links and routes don't render components correctly
- in tests with enzyme and jest:
* <BrowserRouter> tag needs to wrap the component in wrapper to avoid the error 'Link needs to be in Router'
* inconsistency in tests working and not find.lenght etc - > *TO FIX*
* BUG -> when you create a new user and go straight into creating habits and create a habit and press 'ADD' -> it redirects you to Tracker but doesn't map the array of habit for some reason. After you go through the 'login' route it does -> *TO FIX*
* passing a parameter AND event in handleChange: solved:

defining the function:
```
handleChange = (event, habitIndex) => {}
```
in input:
```
onChange={event => this.handleChange(event, index)}
```
* A component is changing an uncontrolled input of type number to be controlled.
* a 1 character / change delay in handleChange function --> hence we want to introduce React Hooks

## How we would develop our app further

### Stand Up Tue

* Steven:
MongoDB set up on Huseyin's machine
all routes work through Postman

* Huseyin:
created basic routes
today we need to link them to the frontend 

* Hanna:
created basic frontend
tested frontend

* James:
created basic frontend
tested frontend

Plan for today:
- create axios requests
- post + get
- put function

### Stand Up Wed

### Stand Up Thu
Steven:
* yesterday helped finish the routes
* made suggestions to the delete button
* spreadshit for the presentation
* today: testing
Huseyin:
* finish off the delete button
* tests 
James:
* yesterday: yesterday: made progress bars and tracking work, styling for sign up page
* today: styling + testing frontned
Hanna:
* yesterday: made progress bars and tracking work, refactored to Hooks
* today: styling + testing frontned

merge hell
### Stand Up Fri


