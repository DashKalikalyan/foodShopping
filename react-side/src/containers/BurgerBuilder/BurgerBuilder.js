import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actiontypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        // ingredients : {
        //     salad:0,
        //     bacon:0,
        //     cheese:0,
        //     meat:0
        // },
        // purchasable:false,
        purchasing:false
    };

    componentDidMount() {
        // axios.get('https://burger-bf2a6.firebaseio.com/ingredient.json')
        //     .then((response)=>{
        //         console.log(response);
        //         this.setState({ingredients:response.data});
        //     });
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    };

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname:'/checkout'
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
        return sum>0;
    };

    render () {

        console.log('rendering');
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        return (
            <div>
                <Burger
                    ingredients={this.props.ings}/>
                <Modal
                    purchaseCancelHandler={this.purchaseCancelHandler}
                    show={this.state.purchasing}>
                    <OrderSummery
                        purchaseContinueHandler={this.purchaseContinueHandler}
                        purchaseCancelHandler={this.purchaseCancelHandler}
                        ingredients = {this.props.ings}
                        totalPrice={this.props.totalPrice}/>
                </Modal>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchaseHandler={this.purchaseHandler}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    price={this.props.totalPrice}/>
            </div>
        );
    }
}

const mapStateToProps= (state) => {
    return {
        ings: state.ingredients,
        totalPrice:state.totalPrice
    }
};
const mapDispatchToProps= (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({type: actiontypes.ADD_INGREDIENT, ingredientName: ingredientName},),
        onIngredientRemoved: (ingredientName) => dispatch({type: actiontypes.REMOVE_INGREDIENT, ingredientName: ingredientName},),
    }
};


export default connect(mapStateToProps, mapDispatchToProps) (BurgerBuilder);