import React from 'react';

const orderSummery = (props) => {
    const ingredientSummery = Object.keys(props.ingredients)
        .map((igKey) => {
            return <li><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        });

    return (
        <div>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following ingredients</p>
            <ul>
                {/*<li>Salad : {props.ingredients.salad}</li>*/}
                {/*<li>Bacon : {props.ingredients.bacon}</li>*/}
                {/*<li>Cheese : {props.ingredients.cheese}</li>*/}
                {/*<li>Meat : {props.ingredients.meat}</li>*/}
                {ingredientSummery}
            </ul>
            <p>Continue to Checkout?</p>
            <h4>You need to pay : $ {props.totalPrice}</h4>
            <button onClick={props.purchaseCancelHandler} className="btn btn-danger">CANCEL</button>
            <button onClick={props.purchaseContinueHandler} className="btn btn-success pull-right">CONTINUE</button>
        </div>
    );

};

export default orderSummery;