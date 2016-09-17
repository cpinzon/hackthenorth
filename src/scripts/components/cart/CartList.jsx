import React from 'react';
import classNames from 'classnames';

import CartListItem from "./CartListItem";

class CartList extends React.Component {
    constructor(props){
        super(props);
    }

    getCartItems() {
        if (this.props.items.length > 0) {
            return (
                <span className="cart--empty__text">
                    Your cart is empty
                </span>
            )
        } else {
            return this.props.items.map(cartItem =>
                <CartListItem
                    item={cartItem}>
                </CartListItem>
            )
        }
    }

    render(){
        return (
            <div className="cart__list">
                {this.getCartItems()}
            </div>
        )
    }
}

export default CartList;