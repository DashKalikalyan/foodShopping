import React, {Component} from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import {connect} from 'react-redux';

class Checkout extends Component {
    // state={
    //     ingredients: {
    //         salad:1,
    //         meat:1,
    //         cheese:1,
    //         bacon:1
    //     },
    //     totalPrice: 0
    // };




    checkoutCancelled= () => {
        this.props.history.push('/');
        // this.props.history.goBack();
    };

    checkoutContinued= () => {
        if(!this.props.token){
            this.props.history.push({
                pathname:'/login'
            });
        } else {
            if(this.props.match.params.id){
                this.props.history.push({
                    pathname:'/contact-data/'+this.props.match.params.id
                });
            } else {
                this.props.history.push({
                    pathname:'/contact-data'
                });
            }
        }
    };

    render() {
        return(
            <div>
                <CheckoutSummery
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
            </div>
        );
    }
}

const mapStateToProps= (state) => {
    return {
        ings: state.ingredients,
        totalPrice:state.totalPrice,
        token:state.token
    }
};

export default connect(mapStateToProps) (Checkout);