import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import ContactData from './containers/ContactData/ContactData';
import Orders from './containers/Orders/Orders';
import OrderDetails from './components/OrderDetails/OrderDetails';

class App extends Component {
    render() {
        return (
                <div>
                    <Layout>
                        <Switch>
                            <Route path="/order-details/:id" component={OrderDetails}/>
                            <Route path="/checkout" component={Checkout}/>
                            <Route path="/orders" component={Orders}/>
                            <Route path="/contact-data" component={ContactData}/>
                            <Route path="/" component={BurgerBuilder}/>
                        </Switch>
                    </Layout>
                </div>
        );
    }
}

export default App;
