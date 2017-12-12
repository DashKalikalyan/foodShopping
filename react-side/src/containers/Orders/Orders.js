import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from 'axios';

class Orders extends Component {
    state= {
      orders: []
    };


    componentDidMount() {
        axios.get('https://burger-bf2a6.firebaseio.com/orders.json')
            .then((response) => {
                console.log(response.data);
                let orders=[];
                for(let i in response.data) {
                   orders.push({...response.data[i], id:i});
                }
                this.setState({orders: orders});
                console.log(this.state.orders);
            });
    }

    //
    // orderPlacedHandler= (id) => {
    //     const queryParams=[];
    //     console.log(this.state.orders);
    //     console.log(typeof this.state.orders);
    //     for (let i in this.state.orders.id.ingredients) {
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.orders.id.ingredients[i]));
    //     }
    //     console.log(queryParams);
    //
    //     queryParams.push('price='+this.state.orders.id.price);
    //     const queryString = queryParams.join('&');
    //
    //
    //     this.props.history.push({
    //         pathname:'/',
    //         search: '?'+queryString
    //     });
    // };





    render() {
        return(
            <div>
                {this.state.orders.map((order) => {
                    return(
                        <Order
                            // orderPlacedHandler={this.orderPlacedHandler.bind(this,order.id)}
                            ingredients={order.ingredients}
                            price={order.price}
                            id={order.id}/>
                    );
                })}
            </div>
        );
    }
}

export default Orders;