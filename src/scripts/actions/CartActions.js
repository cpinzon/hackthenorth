import Dispatcher from '../dispatcher/Dispatcher';
import ProductConstants from '../constants/ProductConstants';

class CartActions {

    addProduct() {
        Dispatcher.dispatch({
            actionType: ProductConstants.ADD_TO_CART_SUCCESS,
            payload: ''
        });
    }

    removeProduct() {
        Dispatcher.dispatch({
            actionType: ProductConstants.REMOVE_FORM_CART_SUCCESS,
            payload: ''
        });
    }
}

export default CartActions;