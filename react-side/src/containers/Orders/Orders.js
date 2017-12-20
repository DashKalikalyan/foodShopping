import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from 'axios';
import * as actionCreators from "../../store/actions";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Orders extends Component {
    // state= {
    //   orders: []
    // };


    componentDidMount() {
        console.log('componentDidmount Orders');
        axios.get('http://localhost:3001/orders',{headers:{'x-auth': this.props.token}})
            .then((response) => {
                console.log(response.data);
                let orders=[];
                for(let i in response.data) {
                    console.log({...response.data[i], id:i});
                    orders.push({...response.data[i], id:i});
                }
                console.log(orders);
                this.props.getOrders(orders);
            });
    }

    onDelete=(id) => {
        axios.delete('https://burger-bf2a6.firebaseio.com/orders/'+id+'.json')
            .then((response) => {
                console.log(response);
                axios.get('https://burger-bf2a6.firebaseio.com/orders.json')
                    .then((response) => {
                        console.log(response.data);
                        let orders=[];
                        for(let i in response.data) {
                            console.log({...response.data[i], id:i});
                            orders.push({...response.data[i], id:i});
                        }
                        console.log(orders);
                        this.props.getOrders(orders);
                    });
            });
    };

    onViewOrder=(id)=> {
            this.props.history.push({
                pathname:'/order-details/'+id
            });
    };


    render() {
        return(
            <div className="row">
                {this.props.orders.map((order) => {
                    return(
                            <Order
                                // orderPlacedHandler={this.orderPlacedHandler.bind(this,order.id)}
                                ingredients={order.ingredients}
                                orderData={order.orderData}
                                price={order.price}
                                key={order.id}
                                onDelete={this.onDelete.bind(this,order.id)}
                                onViewOrder={this.onViewOrder.bind(this,order.id)}/>

                    );
                })}
            </div>
        );
    }
}

const mapStateToProps= (state) => {
    return {
        orders:state.orders,
        token:state.token
    };
};

const mapDispatchToProps= (dispatch) => {
    return {
        getOrders: (orders) => dispatch(actionCreators.getOrders(orders))
    };
};



export default connect(mapStateToProps, mapDispatchToProps) (Orders);