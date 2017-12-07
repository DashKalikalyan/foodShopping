import React from 'react';
import classes from './CheckoutSummery.css';
import Burger from "../../Burger/Burger";

const checkoutSummery = (props) => {
    return(
        <div className={classes.CheckoutSummery}>
            <h1>We hope it tastes well</h1>
            <div style={{width:'300px', height:'300px', margin: 'auto'}}>
                <Burger
                    ingredients ={props.ingredients}/>
                <button className="btn btn-danger" onClick={props.checkoutCancelled}>CANCEL</button>
                <button className="btn btn-success pull-right" onClick={props.checkoutContinued}>CHECKOUT</button>
            </div>


        </div>
    );
};

export default checkoutSummery;