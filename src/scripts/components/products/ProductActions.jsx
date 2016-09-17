import React from 'react';
import classNames from 'classnames';

//import CartActions from "../../actions/CartActions";

class ProductActions extends React.Component {
    constructor(props){
        super(props);
    }

    addToCart() {

    }

    increase() {

    }

    decrease() {

    }

    getInteractions() {
        if (this.props.quantity > 0) {
            return (
                <div className="add-remove-cart">
                    <button className="actions__remove" onClick={this.decrease}>-</button>
                    <span className="product__quantity">{this.props.quantity}</span>
                    <button className="actions__add" onClick={this.increase}>+</button>
                </div>
            )
        } else {
            return (
                <button className="actions__add-to-cart" onClick={this.addToCart}>Add to cart</button>
            )
        }
    }

    render(){
        return (
            <div className="product__actions">
                {this.getInteractions()}
            </div>
        )
    }
}

export default ProductActions;