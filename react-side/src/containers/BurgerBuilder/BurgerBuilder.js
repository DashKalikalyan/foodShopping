import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from 'axios';

const INGREDIENT_PRICE = {
    salad: 0.3,
    cheese: 0.3,
    meat: 1,
    bacon: 0.5
};

class BurgerBuilder extends Component {
    state = {
        ingredients : {},
        totalPrice: 4,
        purchasable:false,
        purchasing:false
    };

    componentDidMount() {
        axios.get('https://burger-bf2a6.firebaseio.com/ingredients.json')
            .then((response)=>{
                console.log(response);
                this.setState({ingredients:response.data});
            });
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    };

    purchaseContinueHandler = () => {

        // console.log('You continue!!');
        // const post = {
        //     ingredients:this.state.ingredients
        // };
        //
        // axios.post('https://burger-bf2a6.firebaseio.com/orders.json', post)
        //     .then((response)=>{
        //         console.log(response);
        //     });

        const queryParams=[];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname:'/checkout',
            search: '?'+queryString
        });

    };

    updatePurchaseState = (ingredients) => {
        // console.log(Object.keys(ingredients));
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum+el;
            }, 0);
        this.setState({purchasable: sum>0});
    };

    addIngredientHandler= (type) => {
        const oldCount = this.state.ingredients[type];
        console.log(oldCount);
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler= (type) => {
        const oldCount = this.state.ingredients[type];
        console.log(oldCount);
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    render () {

        console.log('rendering');
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        return (
            <div>
                <Burger
                    ingredients={this.state.ingredients}/>
                <Modal
                    purchaseCancelHandler={this.purchaseCancelHandler}
                    show={this.state.purchasing}>
                    <OrderSummery
                        purchaseContinueHandler={this.purchaseContinueHandler}
                        purchaseCancelHandler={this.purchaseCancelHandler}
                        ingredients = {this.state.ingredients}
                        totalPrice={this.state.totalPrice}/>
                </Modal>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseHandler={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}/>
            </div>
        );
    }
}

export default BurgerBuilder;