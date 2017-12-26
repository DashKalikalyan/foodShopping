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
            phoneNumber:'',
            email:'',
            city:'',
            state:'',
            deliveryMethod:'fastest'
        },
        updateMode:false
    };

    componentDidMount() {
        if (this.props.match.params.id) {
            let i;
            for (i in this.props.orders){
                if (this.props.orders[i]._id===this.props.match.params.id){
                    this.setState({orderForm:this.props.orders[i].orderData});
                }
            }
            this.setState({updateMode:true});
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log('You continue!!');
        const formdata={...this.state.orderForm};
        console.log(this.state.orderForm);
        console.log(formdata);
        const post = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: this.state.orderForm,
            isDelivered:false,
            isDispatched:false
        };

        console.log(post);
        if(this.props.match.params.id){
            console.log(this.props.token);
            axios.put('http://localhost:3001/order/'+this.props.match.params.id,post,{headers:{'x-auth': this.props.token}})
                .then((response)=>{
                    console.log(response);
                });
        } else {
            axios.post('http://localhost:3001/order/', post, {headers:{'x-auth': this.props.token}})
                .then((response) => {
                    console.log(response);
                    // let order={...post, orderId: response.data.name};
                    // this.props.onSaveOrder(order);
                    this.props.history.push({
                        pathname:'/'
                    });

                });
        }
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
        let orderOrUpdate;
        if(this.state.updateMode) {
            orderOrUpdate="Update"
        } else {
            orderOrUpdate="Order"
        }

        return (
            <div>
                <div style={{paddingLeft:'10px'}}><h4>Enter your Contact Details</h4></div>
                <div className="row">
                    <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 ">
                        <form className="col-md-8" onSubmit={this.orderHandler}>
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
                                    type="text"
                                    pattern="(\d{5}([\-]\d{4})?)"
                                    id="zipCode"
                                    name="zipCode"
                                    className="form-control"
                                    placeholder="Zip Code in XXXXX or XXXXX-XXXX"
                                    required
                                    value={this.state.orderForm.zipCode}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="form-control"
                                    placeholder="City"
                                    required
                                    value={this.state.orderForm.city}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="state">State</label>
                                <select
                                    className="form-control"
                                    id="state"
                                    required
                                    name="state"
                                    value={this.state.orderForm.state}
                                    onChange={this.onInputChanged}>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                            </div>

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

                            <br/>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">phoneNumber</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="form-control"
                                    pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                                    size="13"
                                    placeholder="Phone Number in XXX-XXX-XXXX format"
                                    required
                                    value={this.state.orderForm.phoneNumber}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <br/>

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
                            <div style={{paddingLeft:'10px'}}>
                                <button className="btn btn-primary" type="submit">{orderOrUpdate}</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps= (state) => {
    return {
        ings: state.ingredients,
        totalPrice:state.totalPrice,
        token:state.token,
        orders:state.orders
    }
};

export default connect(mapStateToProps) (ContactData);