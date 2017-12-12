import React from 'react';

const input=(props)=> {

    return(
        <div>
            <div>
                <label>{props.label}</label>
                <input type="text"/>
            </div>

        </div>
    );

};

export default input;