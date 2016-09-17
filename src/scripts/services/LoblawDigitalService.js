import Request from 'superagent';

const checkAndHandleResponse = res => {
    if(res && res.statusCode !== 401) {
        return true;
    }

    return false;
}

class LoblawDigitalService {

    constructor() {
        this.apiPath = 'https://www.loblaws.ca/ecommerce/v2/loblaw/';
    }

    getRequest(type = "get", path) {
        let request = Request[type](path)
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'bearer: fd887ce5-7b15-4c1e-93a0-dc91ce883ec6')

        return request;
    }

    getResolve(resolve) {
        return (err, res) => {
            if(checkAndHandleResponse(res)) {
                resolve(res);
            }
        }
    }

    //https://www.loblaws.ca/ecommerce/v2/loblaw/categories/categoryId/products?filters=promotions:Multi&page=1&pageSize=10&sort=price
    //https://www.loblaws.ca/ecommerce/v2/loblaw/categories/LSL001001001001/products?filters=promotions:Multi&sort=price

    getCategoryProducts(categoryId) {
        let promise = new Promise(
            function(resolve, reject) {
                this.getRequest("get", `${this.apiPath}/categories/${categoryId}/products?filters=promotions:Multi&sort=price`)
                    .end(this.getResolve(resolve));
            }.bind(this)
        )
        return promise;
    }

}

export default LoblawDigitalService;
