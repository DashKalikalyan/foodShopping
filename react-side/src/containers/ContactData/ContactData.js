import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


class ContactData extends Component {
    state = {
        orderForm: {
            name:'',
            street:'',
            zipCode:'',
            country:'',
            email:'kkd@gmail.com',
            deliveryMethod:'fastest'
        }
    };

    orderHandler = (event) => {
        console.log('You continue!!');
        const formdata={...this.state.orderForm};
        console.log(this.state.orderForm);
        console.log(formdata);
        const post = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: this.state.orderForm
        };

        console.log(post);

        axios.post('https://burger-bf2a6.firebaseio.com/orders.json', post)
            .then((response) => {
                console.log(response);
                // let order={...post, orderId: response.data.name};
                // this.props.onSaveOrder(order);
                this.props.history.push({
                    pathname:'/'
                });

            });
    };

    onInputChanged = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        console.log(name, value);

        let updatedOrderForm = {...this.state.orderForm, [name]: value};
        this.setState({
            orderForm: updatedOrderForm
        }, ()=> {
            console.log(this.state);
        });
    };

    render() {

        return (
            <div>
                <div style={{paddingLeft:'10px'}}><h4>Enter your Contact Details</h4></div>
                <div className="row">
                    <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 ">
                        <form className="col-md-8" >

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    placeholder="Your Name"
                                    required
                                    value={this.state.orderForm.name}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    className="form-control"
                                    placeholder="Street"
                                    required
                                    value={this.state.orderForm.street}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="zipCode">Zip Code</label>
                                <input
                                    type="number"
                                    id="zipCode"
                                    name="zipCode"
                                    className="form-control"
                                    placeholder="Zip Code"
                                    required
                                    value={this.state.orderForm.zipCode}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    className="form-control"
                                    placeholder="Country"
                                    required
                                    value={this.state.orderForm.country}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email id"
                                    required
                                    value={this.state.orderForm.email}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <br/>


                            <div className="form-group">
                                <label htmlFor="deliveryMethod">Delivery Method</label>
                                <select
                                    className="form-control"
                                    id="deliveryMethod"
                                    required
                                    name="deliveryMethod"
                                    value={this.state.orderForm.deliveryMethod}
                                    onChange={this.onInputChanged}>
                                      <option value="fastest">fastest</option>
                                      <option value="regular">regular</option>
                                      <option value="slow">not in a hurry</option>
                                </select>
                            </div>

                        </form>
                    </div>
                </div>
                <div style={{paddingLeft:'10px'}}>
                    <button className="btn btn-primary" onClick={this.orderHandler}>Order Now</button>
                </div>
                <p>{this.props.orderId}</p>
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

export default connect(mapStateToProps) (ContactData);