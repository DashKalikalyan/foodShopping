import React from 'react';
import classes from'./Toolbar.css';
import {Link} from 'react-router-dom';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <div>LOGO</div>
        <div style={{display:'flex'}}>
            <Link to="/orders" className={classes.X}><div>ORDERS</div></Link>
            <Link to="/"><div style={{paddingLeft:'20px'}} className={classes.X}>LOGIN</div></Link>
            <Link to="/"><div style={{paddingLeft:'20px'}} className={classes.X}>SIGN UP</div></Link>
        </div>
        {/*<div>Burger Builder</div>*/}
    </header>
);

export default toolbar;