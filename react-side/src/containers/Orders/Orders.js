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
        console.log(id);
        axios.delete('http://localhost:3001/order/'+id,
            {headers:{'x-auth': this.props.token}})
            .then((response) => {
                console.log(response);
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
            });
    };

    onViewOrder=(id)=> {
            this.props.history.push({
                pathname:'/order-details/'+id
            });
    };

    onUpdateOrder=(id)=>{
        this.props.history.push({
            pathname:'/order/'+id+'/edit'
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
                                key={order._id}
                                onDelete={this.onDelete.bind(this,order._id)}
                                onViewOrder={this.onViewOrder.bind(this,order._id)}
                                onUpdateOrder={this.onUpdateOrder.bind(this,order._id)}/>
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