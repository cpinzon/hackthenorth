import React from 'react';
import classNames from 'classnames';

class ProductDisplay extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="product__display">
                <img className="product__image" src={this.props.image} alt=""/>
                <span className="product__name">{this.props.name}</span>
                <span className="product__price">{`$${this.props.price}`}</span>
            </div>
        )
    }
}

export default ProductDisplay;