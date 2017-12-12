import * as actiontypes from './actions';

const initialState= {
    ingredients : {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice: 4
};

const INGREDIENT_PRICE = {
    salad: 0.3,
    cheese: 0.3,
    meat: 1,
    bacon: 0.5
};

const reducer= (state=initialState, action) => {
    switch (action.type) {
        case actiontypes.ADD_INGREDIENT:
            // let updatedCount= state.ingredients[action.ingredientName]+1;
            // updatedIngredient={...state.ingredients};
            // updatedIngredient[action.ingredientName]=updatedCount;
            // let newPrice=state.totalPrice+INGREDIENT_PRICE[action.ingredientName];
            // return {
            //     ingredients: updatedIngredient,
            //     totalPrice:newPrice
            // };
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
            };
        case actiontypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;
