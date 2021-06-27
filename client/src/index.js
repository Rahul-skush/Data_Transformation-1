
import React from 'react';
import ReactDOM from 'react-dom';

//import Demo from './prev_working_ui/demo';
import reportWebVitals from './reportWebVitals';

import Stepper from  './Components/JobandDataEntry/stepper'



ReactDOM.render(
  <React.StrictMode>
    <Stepper/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

