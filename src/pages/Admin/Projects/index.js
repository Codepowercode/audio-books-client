import React from "react";
import {List} from 'react-admin';
import Filter from './Filter'

export default (props) => {
    return (
        <List {...props}>
            <Filter/>
        </List>
    );
}