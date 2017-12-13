import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => (
        <div className={classes.BuildControl}>
            <div className={classes.Label} style={{textAlign:"center",width:"200px"}}> {props.label}</div>
                <button className={classes.Less} style={{height:"40px",width:"100px"}} disabled={props.disabled} onClick={props.removed}>Less</button>
                <button className={classes.More} style={{height:"40px",width:"100px"}} onClick={props.added}>More</button>
        </div>
);

export default buildControl;