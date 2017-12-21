import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions';

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
        if(this.props.match.params.id){
            console.log(this.props.match);
            console.log('in update');
            let i;
            let ingredients;
            for (i in this.props.orders){
                if (this.props.orders[i]._id===this.props.match.params.id){
                     ingredients={
                        salad:this.props.orders[i].ingredients.salad,
                        bacon:this.props.orders[i].ingredients.bacon,
                        cheese:this.props.orders[i].ingredients.cheese,
                        meat:this.props.orders[i].ingredients.meat
                    };
                }
            }
            this.props.onSetIngredients(ingredients);

        } else {
            console.log(this.props.match);
            axios.get('http://localhost:3001/ingredients')
                .then((response)=>{
                    console.log('in burgerbuilder componentDidMount');
                    console.log(response.data);
                    const ingredients={
                        salad:response.data[0].salad,
                        bacon:response.data[0].bacon,
                        cheese:response.data[0].cheese,
                        meat:response.data[0].meat
                    };
                    this.props.onSetIngredients(ingredients);
                });
        }
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
        totalPrice:state.totalPrice,
        orders:state.orders
    };
};

const mapDispatchToProps= (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actionCreators.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actionCreators.removeIngredient(ingredientName)),
        onSetIngredients: (ingredients) => dispatch(actionCreators.setIngredients(ingredients))
    };
};


export default connect(mapStateToProps, mapDispatchToProps) (BurgerBuilder);