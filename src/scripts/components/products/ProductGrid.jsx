import React from 'react';
import classNames from 'classnames';

import Product from "./Product";

class ProductGrid extends React.Component {
    constructor(props){
        super(props);
    }

    getProducts() {
        return this.props.products.map(product =>
            <Product
                key={product.id}
                product={product}>
            </Product>
        )
    }

    render(){
        return (
            <div className="product-grid">
                product grid
                {this.getProducts()}
            </div>
        )
    }
}

export default ProductGrid;