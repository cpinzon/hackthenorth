import Dispatcher from '../dispatcher/Dispatcher';
import ProductConstants from '../constants/ProductConstants';
import LoblawDigitalService from "../services/LoblawDigitalService";

class CategoryActions {

    getCategoryProducts(categoryId) {
        Dispatcher.dispatch({
            actionType: ProductConstants.GET_PRODUCTS_REQUEST
        });

        LoblawDigitalService.getCategoryProducts(categoryId).then(function(data) {
            switch(data.statusCode) {
                case 200:
                    Dispatcher.dispatch({
                        actionType: ProductConstants.GET_PRODUCTS_SUCCESS,
                        payload: { patient: data.body.products }
                    });

                    break;
                default:
                // noop
            }
        });
    }

}

export default CategoryActions;