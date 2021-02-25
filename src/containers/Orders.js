import React, {Component} from 'react'
import OrderSummary from '../components/OrderSummary';

import Order from '../components/Order'

class Orders extends Component {
    render () {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default OrderSummary;