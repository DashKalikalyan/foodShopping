import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <div>
        <Backdrop
            purchaseCancelHandler={props.purchaseCancelHandler}
            show={props.show}/>
        <div className={classes.Modal} style={{opacity: props.show ? 1 : 0}}>
            {props.children}
        </div>
    </div>

);

export default modal;