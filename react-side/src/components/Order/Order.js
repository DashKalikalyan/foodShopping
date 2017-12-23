import React from 'react';
import classes from './Order.css';
import Burger from '../Burger/Burger';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        });
    }
    const ingredientOutput=ingredients.map((ingredient)=> {
        return (<span key={ingredient.name} style={{textTransform:'capitalize', display:'inline-block', border:'1px solid #ccc', margin: '0 8px', padding: '5px'}}>{ingredient.name} ({ingredient.amount})</span>);
    });
    let isDelivered;
    let isDispatched;
    if(props.isDelivered){
        isDelivered=(<h4>Delivered</h4>);
    }
    if(props.isDispatched && !props.isDelivered){
        isDispatched=(<h4>Dispatched</h4>);
    }
    if(!props.isDispatched){
        isDispatched=(<h4>Not yet Dispatched</h4>);
    }

    return(

        <div  className="col-lg-4">
                {/*<p style={{textDecoration:'none'}}>Ingredients: {ingredientOutput}</p>*/}
                {/*<p style={{textDecoration:'none'}}>Price: <strong>{props.price}</strong></p>*/}

                <Burger
                    ingredients={props.ingredients}/>
                {isDispatched}
                {isDelivered}
            <div>
                <div style={{padding:'10px'}} className={classes.Flex}>
                    <button
                        className={classes.Button}
                        onClick={props.onViewOrder}>
                        VIEW
                    </button>
                    <button
                        className={classes.Button}
                        onClick={props.onUpdateOrder}
                        style={{marginLeft:'40px'}}
                        disabled={props.isDispatched}>
                        UPDATE
                    </button>
                    <button
                        className={classes.Button}
                        onClick={props.onDelete}
                        disabled={props.isDispatched}
                        style={{marginLeft:'40px'}}>
                        CANCEL
                    </button>
                </div>
            </div>
        </div>

    );
};

export default order;