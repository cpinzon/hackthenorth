import React from 'react';
import classNames from 'classnames';

// child components
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import CartFooter from "./CartFooter";

class Cart extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const hasProducts = this.props.cart.totalQty > 0;
        return (
            <div className="cart">
                <CartHeader qty={this.props.cart.totalQty} total={this.props.cart.total}></CartHeader>
                <CartList items={this.props.cart.cartProducts}></CartList>
                <CartFooter isActive={hasProducts}></CartFooter>
            </div>
        )
    }
}

export default Cart;