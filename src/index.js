import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Flow from "./flow"
import 'bootstrap/dist/css/bootstrap.min.css';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// ========================================

ReactDOM.render(
    <Flow />,
    document.getElementById("root")
);