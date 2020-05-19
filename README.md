# habit-app
### James Hanna Steven Huseyin

### Project Name :  (Habit Tracker)
Hanna, Huseyin, Steven, James

### Project Brief / User Stories

In the project directory, you can run:

### To start (instructions on how to initialise App)

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Installation

## About

## Technology

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
Steven:
- MongoDB set up on Huseyin's machine
- all routes work through Postman
Huseyin:
- creating basic routes
* today we need to link them to the frontend 

Hanna:
* created basic frontend
* tested frontend

James:
* created basic frontend
* tested frontend

Plan for today:
- create axios requests
- post + get
- put function

### Stand Up Wed

### Stand Up Thu

### Stand Up Fri


