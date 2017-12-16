export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
// export const SET_CONTACTDATA= 'SET_CONTACTDATA';
export const GET_ORDERS= 'GET_ORDERS';

export const addIngredient= (ingredientName)=> {
    return {
      type:ADD_INGREDIENT,
      ingredientName:ingredientName
    };
};
export const removeIngredient= (ingredientName)=> {
    return {
        type:REMOVE_INGREDIENT,
        ingredientName:ingredientName
    };
};

export const setIngredients= (ingredients)=> {
    return {
        type:SET_INGREDIENTS,
        ingredients:ingredients
    };
};

// export const changeContact= (orderForm) => {
//     return {
//         type:SET_CONTACTDATA,
//         orderForm:orderForm
//     };
// };

export const getOrders= (orders) => {
    return {
        type:GET_ORDERS,
        orders:orders
    };
};
