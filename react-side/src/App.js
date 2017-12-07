import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import ContactData from './containers/ContactData/ContactData';

class App extends Component {
    render() {
        return (
                <div>
                    <Layout>
                        <Switch>
                            <Route path="/checkout" component={Checkout}/>
                            <Route path="/contact-data" component={ContactData}/>
                            <Route path="/" component={BurgerBuilder}/>
                        </Switch>
                    </Layout>
                </div>
        );
    }
}

export default App;
