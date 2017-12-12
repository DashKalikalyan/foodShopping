import React from 'react';
import classes from'./Toolbar.css';
import {Link} from 'react-router-dom';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <div>LOGO</div>
        <div><Link to="/orders">Order</Link></div>
        {/*<div>Burger Builder</div>*/}
    </header>
);

export default toolbar;