import React from 'react';
import Aux from '../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from './Toolbar'
import SideDrawer from './SideDrawer'

const layout = (props) => (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;