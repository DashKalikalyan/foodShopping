import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import classes from './Layout.css';

const layout = (props) => (
    <div className={classes.Content}>
        <Toolbar/>
        <main>{props.children}</main>
    </div>
);

export default layout;