import React from 'react';
import classNames from 'classnames';
import Cart from './cart/Cart';
import ProductGrid from './products/ProductGrid';
import CategoryActions from "../actions/CategoryActions";

import CartStore from "../stores/CartStore";
import ProductStore from "../stores/ProductStore";

const _getState = () => {
	return {
		cart: CartStore.getCart(),
		products: ProductStore.getProducts()
	}
}

class App extends React.Component {
	constructor(){
		super();

		this.state = {
			cart: {
				cartProducts: [],
				totalQty: 0,
				total: 0
			},
			products: [
				{
					id: '20026740001_KG',
					name: 'PEARS YA',
					price: '2.82',
					image: "https://assets.shop.loblaws.ca/products/20026740001/b1/en/front/20026740001_front_a01.png",
					cartQty: 0
				},
				{
					id: '20010146001_KG',
					name: "APPLE CRISPIN",
					price: '3.73',
					image: "https://assets.shop.loblaws.ca/products/20010146001/b1/en/front/20010146001_front_a01.png",
					cartQty: 0
				},
				{
					id: '20002225001_KG',
					name: "APPLE MCINTOSH ORCH RUN",
					price: '5.73',
					image: "https://assets.shop.loblaws.ca/products/20002225001/b1/en/front/20002225001_front_a01.png",
					cartQty: 0
				}
			]
		};
	}

	//componentWillMount() {
	//	CategoryActions.getCategoryProducts("LSL001001001001");
	//}

	componentDidMount() {
		CartStore.addChangeListener(this.handleChange);
		ProductStore.addChangeListener(this.handleChange);
	}

	componentWillUnmount() {
		CartStore.removeChangeListener(this.handleChange);
		ProductStore.removeChangeListener(this.handleChange);
	}

	handleChange() {
		this.setState(_getState());
	}

	render(){
		return (
			<div className="container">
				<div className="clearfix">
					<div className="header">
						<span className="header__title">Loblaw Digital Sample App</span>
						<Cart cart={this.state.cart}></Cart>
					</div>
				</div>
				<ProductGrid products={this.state.products}></ProductGrid>
			</div>
		)
	}
}

export default App;