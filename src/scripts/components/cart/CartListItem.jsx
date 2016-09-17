import React from 'react';
import classNames from 'classnames';

class CartListItem extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let cartPrice = Number(this.props.price)*this.props.cartQty;

        return (
            <div className="cart-list__item">
                <span className="cart-item__qty">{this.props.cartQty}</span>
                <span className="cart-item__qty">{this.props.name}</span>
                <span className="cart-item__qty">{cartPrice}</span>
            </div>
        )
    }
}

export default CartListItem;