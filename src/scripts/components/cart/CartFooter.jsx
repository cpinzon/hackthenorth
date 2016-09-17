import React from 'react';
import classNames from 'classnames';

class CartFooter extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const btnClasses = classNames('footer__checkout', {
            'footer--disabled__checkout': !this.props.isActive
        });

        return (
            <div className="cart__footer">
                <button className={btnClasses}>
                    Checkout
                </button>
            </div>
        )
    }
}

export default CartFooter;