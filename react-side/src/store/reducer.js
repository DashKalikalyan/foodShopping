import * as actiontypes from './actions';

const initialState= {
    ingredients : {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice: 4,
    orders:[],
    token:'',
    isDispatched:true,
    isDelivered:false
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
        case actiontypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                }
            };
        // case actiontypes.SET_CONTACTDATA:
        //     return {
        //         ...state,
        //         orderForm:action.orderForm
        //     };
        case actiontypes.GET_ORDERS:
            console.log(action.orders);
            console.log(state);
            return {
                ...state,
                orders:action.orders
            };
        case actiontypes.SAVE_TOKEN:
            console.log(action.token);
            return {
                ...state,
                token:action.token
            };
        default:
            return state;
    }
};

export default reducer;
