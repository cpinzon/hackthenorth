import BaseStore from './BaseStore';
import Dispatcher from '../dispatcher/Dispatcher';
import EventEmitter from 'events';
import ProductConstants from '../constants/ProductConstants';

import ProductModel from '../models/ProductModel';

let _products = [];
let _lookup = {};
let _pending = false;

const setPending = isPending => {
    _pending = isPending;
}

const createLookup = () => {
    _lookup = {};
    for (let product in _products) {
        _lookup[_products[product].id] = product;
    }
}

const create = (data) => {
    if(data.length) {
       let products = data.map(item => {
          let productData = {
             id: item.id,
             name: item.productName,
             price: item.price,
             image: item.productImageMap.desktop[0]
          };

          let product = Object.assign({}, ProductModel, productData);
          return product;
       });

       _products = products;
    } else {
        clear();
    }

    createLookup();
}

const clear = () => {
    _products = [];
}

class ProductStoreClass extends BaseStore {

    getProducts() {
        return _products;
    }
}

const ProductStore = new ProductStoreClass();

ProductStore.dispatcherIndex = Dispatcher.register(action => {

        switch(action.actionType) {
            case ProductConstants.GET_PRODUCTS_REQUEST:
                setPending(true);
                ProductStore.emitChange();
                break;
            case ProductConstants.GET_PRODUCTS_SUCCESS:
                setPending(false);
                create(action.payload.products);
                ProductStore.emitChange();
                break;
            default:
                // no op
        }

    return true;
});

export default ProductStore;