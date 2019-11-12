### Prerequisites

- Node.js
- MongoDB (local or cloud)
- Postman
- React Developer Tools for Chrome
- Redux Dev Tools for Chrome

### Visual Studio Extension

- Bracket Pair Colorizer
- ES7 React/Redux/GraphQL/React-Native snippet (shortcut for snippets)
- Prettier - Code Formatter

### Server (Express)

- Start up project
  npm init

- Add .gitignore
  node_modules/

- install server dependency packages
  npm install express express-validator bcryptjs config gravatar jsonwebtoken mongoose request
  npm i -D nodemon concurrently // it allows to run front and backend at the same time in one command line

- Add server.js
  inlcude express web server
  init middleware
  run api health check
  add port and listen to port

- Add config folder and
  - default.json
    {
    "mongoURI": "mongodb://127.0.0.1:27017/kttsln",
    "jwtSecret": "kttslnjwtsecret",
    }
  - db.js
    establish connection to mongodb
- Add connectDB from db.js and call connectDB function

- run server
  Change package.json
  "scripts": {
  "start": "node server",
  "server": "nodemon server",
  },

  start server: npm run server

- define models (create new models table)
- define apis
  - define a new route in server.js
  - add routes/api folder for the first time
  - add new api e.g. routes/api/projects

### Client (React)

- Create client website
  npx create-react-app client
  cd client
  npm start

- install client dependency packages
  npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment uuid prop-types

- Run front end and back end concurrently

  - Add client to script to run front end server,
  - "scripts": {
  - "client": "npm start --prefix client" //"npm start" run client react on port 3000
    -},
  - Add dev to script to run both front and back end servers
  - "scripts": {
  - "dev": "concurrently \"npm run server\" \"npm run client\""
  - }

  - Add proxy to package.json so we can use relative path to trigger server api. e.g. axio.get('api/profile')
  - "proxy": "http://localhost:5481"

- Clean up client folder

  - Delete following file
    - App.test.js
    - index.css
    - logo.svg
    - serviceWorker.js

- Remove every in App.js and add Fragment tag
- Add awsome font

  - https://fontawesome.com/
  - Add font awsome link to ~ client/public/index.html

- Add layout components

  - Create components/layout folder
  - Create Navbar.js and Landing.js components
  - Import Navbar and Landing components to App.js

- React Route Setup

  - import Router library to App.js
    - import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
  - Place Router become root tag in App.js
  - Every route need to place inside section with class is container so that it align in the center. Except root route
  - Every route should place inside switch

- useState hook

  - it is equivalent to react state
  - const [formData, setFormData] = useState();
  - formData is similar to state = { formData:{}}
  - setFormData is similar to this.setState = {}
  - How to use
    - import React, { Fragment, useState } from 'react';
    - const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: ''});
    - const { name, email, password, password2 } = formData; // Accessing state property
    - <input type="text" placeholder="Name" name="name"
      value={name}
      onChange={e => onChange(e)}
      required
      />
    - const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value }); // set state
    - if (password !== password2) // access component state

* PropTypes to restrict type of props
  import PropTypes from 'prop-types';

  Register.propTypes = {
  setAlert: PropTypes.func.isRequired, (ptfr)
  }

### React Redux

- It is application level state
- Install redux dev tool into chrome browser
- Setup steps

  - Setup redux store

    - Create store.js in root folder
      - Implement boiletplate
      - import { createStore, applyMiddleware } from 'redux';
      - import { composeWithDevTools } from 'redux-devtools-extension';
      - import thunk from 'redux-thunk'; // react middleware
      - import rootReducer from './reducers';
      - const initalState = {};
      - const middleware = [thunk];
      - const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)));
      - export default store

  - Create Reducer

    - Create alert.js reducer
      import { SET_ALERT } from '../actions/actionTypes';
      const initalState = [];

      export default function(state = initalState, action) {
      switch (action.type) {
      case SET_ALERT:
      return [...state, action.payload]; // typical reducer returns a new state insite of a previous array and new payload.
      case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
      default:
      return state;
      }
      }

    - Create index.js contains combineReducers

      - import { combineReducers } from 'redux';
        import alert from './alert';

      export default combineReducers({
      alert
      });

  - Create Action

    - Create alert.js action
      import uuid from 'uuid';
      import { SET_ALERT, REMOVE_ALERT } from './actionTypes';

      export const setAlert = (msg, alertType) => dispatch => {
      const id = uuid.v4();
      dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id }
      });
      };

  - Wire action to component to dispatch action

    - Go to admin.js component
    - 1. import connect from react-redux and setAlert action
         import { connect } from 'react-redux';
         import { setAlert } from '../../actions/alert';
    - 2. connect to component. In this case we only want to update state to store
         export default connect(null,{ setAlert })(Admin); // connect has 2 params mapstatetoprops and actions
    - 3. Invoke action
         const Admin = props => {
         ...
         props.setAlert('Password do not match', 'danger');
         }

  - component to read state
    import { connect } from 'react-redux';

    const Alert = props =>
    props.alerts !== null &&
    props.alerts.length > 0 &&
    props.alerts.map(alert => (

    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    {alert.msg}
    </div>
    ));

    // state.alert came from reducer/index.js combineReducers
    const mapStateToProps = state => ({alerts: state.alert });

    // In this componenr we try to read state (redux)
    export default connect(mapStateToProps,null)(Alert);

### HTML and CSS

https://www.youtube.com/watch?v=IFM9hbapeA0&list=PLillGF-Rfqba3xeEvDzIcUCxwMlGiewfV

### ES6 & ES7

- spead operator use to copy existing data
