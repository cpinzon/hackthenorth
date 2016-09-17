import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher/Dispatcher';
import EventEmitter from 'events';
import ProductConstants from '../constants/ProductConstants';

import CartProductModel from '../models/CartProductModel';

let _products = [];
let _lookup = {};
let _qty = 0;
let _total = 0;

const createLookup = () => {
    _lookup = {};
    for (let product in _products) {
        _lookup[_products[product].id] = product;
    }
}

const add = (product) => {

}

const remove = (product) => {

}

const updateQty = () => {

}

const updateTotal = () => {

}

class CartStoreClass extends BaseStore {

    getCart() {
        return {
            cartProducts: _products,
            totalQty: _qty,
            total: _total
        }
    }
}


const CartStore = new CartStoreClass();

CartStore.dispatcherIndex = Dispatcher.register(action => {

    switch(action.actionType) {
        case CartStore.ADD_TO_CART_SUCCESS:
            add(product);
            CartStore.emitChange();
            break;
        case CartStore.REMOVE_FORM_CART_SUCCESS:
            remove(product);
            CartStore.emitChange();
            break;
        default:
            // no op
        }

    return true;
});

export default CartStore;
