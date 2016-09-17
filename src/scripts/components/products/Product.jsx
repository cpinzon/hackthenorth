import React from 'react';
import classNames from 'classnames';

import ProductActions from "./ProductActions";
import ProductDisplay from "./ProductDisplay";

class Product extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="product">
                <ProductDisplay
                    name={this.props.product.name}
                    price={this.props.product.price}
                    image={this.props.product.image} >
                </ProductDisplay>
                <ProductActions
                    quantity={this.props.product.cartQty}>
                </ProductActions>
            </div>
        )
    }
}

export default Product;