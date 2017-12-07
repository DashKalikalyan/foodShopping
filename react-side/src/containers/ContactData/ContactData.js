import React, {Component} from 'react';

class ContactData extends Component {
    state= {

    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            console.log(param);
            ingredients[param[0]] = param[1];
        }
        console.log(ingredients);

    }

    render() {
        return(
            <div>
                <h1>Enter your details</h1>
            </div>
        );
    }
}

export default ContactData;