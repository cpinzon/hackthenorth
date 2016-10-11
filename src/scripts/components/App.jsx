import React from 'react';
import classNames from 'classnames';
import Cart from './cart/Cart';
import ProductGrid from './products/ProductGrid';
import CategoryActions from "../actions/CategoryActions";
import Dispatcher from '../dispatcher/Dispatcher';

import CartStore from "../stores/CartStore";
import ProductStore from "../stores/ProductStore";

import Request from 'superagent';

const ProductConstants = {
    GET_PRODUCTS_REQUEST: 'GET_PRODUCTS_REQUEST',
    GET_PRODUCTS_SUCCESS: 'GET_PRODUCTS_SUCCESS',

    ADD_TO_CART_REQUEST: 'ADD_TO_CART_REQUEST',
    ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',

    REMOVE_FROM_CART_REQUEST: 'REMOVE_FROM_CART_REQUEST',
    REMOVE_FORM_CART_SUCCESS: 'REMOVE_FORM_CART_SUCCESS'
};

const checkAndHandleResponse = res => {
	if(res && res.statusCode !== 401) {
		return true;
	}

	return false;
}

const _getRequest = (type = "get", path) => {
	let request = Request[type](path)
		.set('Content-Type', 'application/json')
		.set('Authorization', 'bearer: fd887ce5-7b15-4c1e-93a0-dc91ce883ec6')

	return request;
}

const _getResolve = (resolve) => {
	return (err, res) => {
		if(checkAndHandleResponse(res)) {
			resolve(res);
		}
	}
}

const _getState = () => {
	return {
		cart: CartStore.getCart(),
		products: ProductStore.getProducts()
	}
}

const _loblawDigital = (categoryId) => {
	let promise = new Promise(
		function(resolve, reject) {
			_getRequest("get", `https://www.loblaws.ca/ecommerce/v2/loblaw/categories/${categoryId}/products?filters=promotions:Multi&sort=price`)
				.end(_getResolve(resolve));
		}.bind(this)
	)
	return promise;
}

const _getCategoryProducts = (categoryId) => {
	Dispatcher.dispatch({
		actionType: ProductConstants.GET_PRODUCTS_REQUEST
	});

	_loblawDigital(categoryId).then(function(data) {
		switch(data.statusCode) {
			case 200:
				Dispatcher.dispatch({
					actionType: ProductConstants.GET_PRODUCTS_SUCCESS,
					payload: { products: data.body.products }
				});

				break;
			default:
			// noop
		}
	});
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

	componentWillMount() {
		//CategoryActions.getCategoryProducts("LSL001001001001");
		_getCategoryProducts("LSL001001001001")
	}

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