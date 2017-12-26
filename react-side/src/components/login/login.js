import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actionCreators from "../../store/actions";


class Login extends Component {
    state = {
        orderForm: {
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

    componentDidMount(){
        console.log(this.props.match);
    }


    LoginHandler= (event) => {
        console.log('You login!!');
        const loginInfo={...this.state.orderForm};
        console.log(this.state.orderForm);
        console.log(loginInfo);

        axios.post('http://localhost:3001/login', loginInfo)
            .then((response) => {
                console.log(response.data.tokens[0].token);
                console.log(response);
                this.props.onSaveToken(response.data.tokens[0].token);
                if(this.props.ings.meat+this.props.ings.cheese+this.props.ings.bacon+this.props.ings.salad){
                    this.props.history.push({
                        pathname:'/contact-data'
                    })
                } else{
                    this.props.history.push({
                        pathname:'/'
                    });
                }

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
                    <button className="btn btn-primary" onClick={this.LoginHandler}>LOG IN</button>
                </div>
                <br/>
                <div>
                    <p>Don't have an account yet?<span><Link to="/signup">Signup</Link></span></p>
                </div>
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



export default connect(mapStateToProps,mapDispatchToProps) (Login);