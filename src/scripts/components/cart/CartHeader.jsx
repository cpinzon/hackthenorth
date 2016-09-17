import React from 'react';
import classNames from 'classnames';

class CartHeader extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="cart__header">
                <span className="cart__qty">{this.props.qty}</span>
                <span className="cart__total">${this.props.total}</span>
            </div>
        )
    }
}

export default CartHeader;