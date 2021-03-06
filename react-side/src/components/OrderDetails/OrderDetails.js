import React,{Component} from 'react';
import Burger from '../Burger/Burger';
import axios from 'axios';
import * as actionCreators from "../../store/actions";
import {connect} from 'react-redux';

class OrderDetails extends Component {
    state= {
      order:null
    };

    componentDidMount() {
        console.log('in order-details');
        console.log(this.props.match.params.id);
        axios.get('http://localhost:3001/order-details/'+this.props.match.params.id,{
            headers:{'x-auth': this.props.token}})
            .then((response)=>{
                console.log(response.data);
                let order={...response.data};
                this.setState({order:order});
                console.log(order);
            });
    }


    render() {

        let orderDetails=(<p>Loading</p>);
        let ingredientOutput;

        if(this.state.order) {
            const ingredients = [];

            for (let ingredientName in this.state.order.ingredients) {
                ingredients.push({
                    name:ingredientName,
                    amount:this.state.order.ingredients[ingredientName]
                });
            }
            ingredientOutput=ingredients.map((ingredient)=> {
                return (<span key={ingredient.name} style={{textTransform:'capitalize', display:'inline-block', border:'1px solid #ccc', margin: '0 8px', padding: '5px'}}>{ingredient.name} ({ingredient.amount})</span>);
            });

        }

        if(this.state.order) {
            orderDetails=(
                <div>
                    <p style={{textDecoration:'none'}}>Ingredients: {ingredientOutput}</p>
                    <p style={{textDecoration:'none'}}>Price: <strong>{this.state.order.price}</strong></p>
                    <div className="row">
                        <div className="col-lg-6">
                            <h1 style={{textDecoration:'none'}}>Your Order No: {this.state.order._id}</h1>
                            <h1>Deliver to</h1>

                            <h3 style={{textDecoration:'none'}}>NAME- {this.state.order.orderData.name}</h3>
                            <h4 style={{textDecoration:'none'}}>Street- {this.state.order.orderData.street}</h4>
                            <h4 style={{textDecoration:'none'}}>Zip Code- {this.state.order.orderData.zipCode}</h4>
                            <h4 style={{textDecoration:'none'}}>Country- {this.state.order.orderData.country}</h4>
                            <h4 style={{textDecoration:'none'}}>Delivery- {this.state.order.orderData.deliveryMethod}</h4>
                            <h4 style={{textDecoration:'none'}}>Email- {this.state.order.orderData.email}</h4>
                            <h4 style={{textDecoration:'none'}}>Phone Number- {this.state.order.orderData.phoneNumber}</h4>
                            <h4 style={{textDecoration:'none'}}>City- {this.state.order.orderData.city}</h4>
                            <h4 style={{textDecoration:'none'}}>State- {this.state.order.orderData.state}</h4>
                        </div>
                        <div className="col-lg-6">
                            <Burger
                                ingredients={this.state.order.ingredients}/>
                        </div>
                    </div>
                </div>
            );
        }

            return(
                <div>{orderDetails}</div>
            );
        }
}

const mapStateToProps= (state) => {
    return {
        orders:state.orders,
        token:state.token
    };
};

export default  connect(mapStateToProps)(OrderDetails);