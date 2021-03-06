import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionCreators from "../../store/actions";


class Signup extends Component {
    state = {
        orderForm: {
            firstName:'',
            lastName:'',
            phoneNumber:'',
            email:'',
            password:''
        }
    };

    componentWillMount() {
        if(this.props.token){
            this.props.history.push({
                pathname:'/'
            });
        }
    }

     signupHandler= (event) => {
        console.log('You signup!!');
        const profileInfo={...this.state.orderForm};
        console.log(this.state.orderForm);
        console.log(profileInfo);

        axios.post('http://localhost:3001/signup', profileInfo)
            .then((response) => {
                console.log(response.data.tokens[0].token);

                console.log(response);
                this.props.onSaveToken(response.data.tokens[0].token);
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
                <div className="row">
                    <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 ">
                        <form className="col-md-8" >

                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="form-control"
                                    placeholder="Enter your First name"
                                    required
                                    value={this.state.orderForm.firstName}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="form-control"
                                    placeholder="Enter your Last name"
                                    required
                                    value={this.state.orderForm.lastName}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="form-control"
                                    placeholder="Enter your mobile number"
                                    required
                                    value={this.state.orderForm.mobileNumber}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    required
                                    value={this.state.orderForm.email}
                                    onChange={this.onInputChanged}/>
                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    required
                                    value={this.state.orderForm.password}
                                    onChange={this.onInputChanged}/>
                            </div>

                        </form>
                    </div>
                </div>
                <div style={{paddingLeft:'10px'}}>
                    <button className="btn btn-primary" onClick={this.signupHandler}>SIGN UP</button>
                </div>
                <p>{this.props.orderId}</p>
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

const mapDispatchToProps= (dispatch) => {
    return {
        onSaveToken: (token) => dispatch(actionCreators.saveToken(token))
    };
};



export default connect(mapStateToProps,mapDispatchToProps) (Signup);