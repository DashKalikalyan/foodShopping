import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
    {label : 'Salad', type : 'salad'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Cheese', type : 'cheese'},
    {label : 'Meat', type : 'meat'}
];

const buildControls = (props) => {
    let updateOrOrder;
    if (props.updatingOrder) {
        updateOrOrder=(<button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchaseHandler}>UPDATE</button>);
    } else {updateOrOrder=(<button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchaseHandler}>ORDER NOW</button>);

    }
    return(
        <div className={classes.BuildControls}>
            <p><strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    disabled={props.disabled[control.type]}
                    price={props.price}
                    // added={() => {props.ingredientAdded(control.type)}}
                    added={props.ingredientAdded.bind(this,control.type)}
                    removed={props.ingredientRemoved.bind(this,control.type)}/>
            ))}
            {updateOrOrder}
        </div>
)};


export default buildControls;