/* Package JSON Import will be here */
import React from 'react';
import ReactDOM from 'react-dom';
/* Package JSON Import will be here */

/* Project Import will be here */
import './index.css';
import App from './App';
import Home from './home';
import registerServiceWorker from './registerServiceWorker';
/* Project Import will be here */

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
