import React from 'react';
import classes from './Order.css';

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
    return(

        <div className={classes.Order} >
            <p style={{textDecoration:'none'}}>Ingredients: {ingredientOutput}</p>
            <p style={{textDecoration:'none'}}>Price: <strong>{props.price}</strong></p>
        </div>

    );
};

export default order;