import React, {Component} from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';

class Checkout extends Component {
    state={
        ingredients: {
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    };


    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            console.log(param);
            ingredients[param[0]] = param[1];
        }
        this.setState({ingredients:ingredients});
    }


    checkoutCancelled= () => {
        this.props.history.push('/');
        // this.props.history.goBack();
    };

    checkoutContinued= () => {
        const queryParams=[];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname:'/contact-data',
            search: '?'+queryString
        });

    };

    render() {
        return(
            <div>
                <CheckoutSummery
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
            </div>
        );
    }
}

export default Checkout;