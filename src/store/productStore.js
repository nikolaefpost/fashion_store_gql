import {
    makeAutoObservable,
    configure
} from "mobx";



configure({enforceActions: 'observed'})


const apiProdUrl = 'https://fakestoreapi.com/products'
const apiCategUrl = 'https://fakestoreapi.com/products/categories'

class EmployeeService {
    getEmployees = (apiUrl) => {
        return fetch(apiUrl).then((response) => response.json()).catch(err => {
            console.log(err)
            return []
        })
    }

    getEmployeesAsyncAwait = async (apiUrl) => {
        try {
            const response = await fetch(apiUrl)
            return await response.json()
        } catch (e) {
            console.log(e)
            return []
        }
    }
}


export class ProductData {
    product = [];
    category = [];
    currentCategory = "";
    currentColor = "";
    currentSize = "";
    list = [];
    sortMinMax = {min: 0, max: 184}
    changePriseRange = false;
    sortInputMinMax = {}
    sortingOption = null
    isLoading = true

    constructor(rootStore) {
        makeAutoObservable(this, {rootStore: false})
        this.rootStore = rootStore
        this.employeeService = new EmployeeService()
        // this.getProductsFlow()
        // this.getProducts()

    }


    setProducts = (apiData) => {
        this.product = apiData.map(item => ({...item, cmt: 0}))
    }

    setCategory = (apiData) => {
        this.category = apiData
    }

    setList = (data) => {
        this.list = data
    }

    setCurrentColor = (color) => {
        this.currentColor = color
    }

    setCurrentSize = (size) => {
        this.currentSize = size
    }

    setMinPrice = (min) => {
        this.sortMinMax.min = min;
        this.sortInputMinMax.min = Math.round(min * this.ratio);
    }

    setMaxPrice = (max) => {
        this.sortMinMax.max = max;
        this.sortInputMinMax.max = Math.round(max * this.ratio);
    }


    setInputMinPrice = (min) => {
        if (min < this.sortInputMinMax.max - 90) {
            this.sortInputMinMax.min = min;
            this.sortMinMax.min = min / this.ratio;
        }
    }
    setInputMaxPrice = (max) => {
        if (max > this.sortInputMinMax.min + 90) {
            this.sortInputMinMax.max = max;
            this.sortMinMax.max = max / this.ratio;
        }
        if (max > this.max) {
            this.sortInputMinMax.max = this.max;
            this.sortMinMax.max = this.max / this.ratio;
        }
    }

    sortPriceMinMax = () => {

        let dataList;
        if (this.currentCategory !== "") {
            dataList = this.product.filter(item => item.category === this.currentCategory);
        } else {
            dataList = this.product;
        }

        if (this.sortMinMax.min !== 0 || this.sortMinMax.max !== 184) {
            this.changePriseRange = true
            dataList = dataList.filter((pr) => pr.price > this.sortInputMinMax.min && pr.price < this.sortInputMinMax.max)
        }
        this.list = dataList;
        // если есть флаги размера и цвета то от сюда запускать сортировку по ним и так в каждой сотртировочной функции
    }

    setMinMaxPrice = () => {
        this.max = Math.round(this.product.reduce((a, b) => a.price > b.price ? a : b).price);
        this.min = Math.round(this.product.reduce((a, b) => a.price > b.price ? b : a).price);
        this.ratio = this.max / 184
        this.sortInputMinMax = {
            min: this.sortMinMax.min * this.ratio,
            max: Math.round(this.sortMinMax.max * this.ratio)
        }
    }

    setSortingOption = (option) => {
        this.sortingOption = option
    }

    sortListByOption = () => {
        if (!this.sortingOption) return
        switch (this.sortingOption.id) {
            case 0:
                this.list.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            case 1:
                this.list.sort((a, b) => a.price > b.price ? 1 : -1);
                break;
            case 2:
                this.list.sort((a, b) => a.price > b.price ? -1 : 1);
                break;
            default:
                this.sortingOption = null;
        }
    }

    reset = () => {
        this.sortMinMax = {min: 0, max: 184}
        this.changePriseRange = false;
        this.sortInputMinMax = {min: 0, max: 184 * this.ratio}
        this.currentColor = "";
        this.currentSize = "";
        this.sortingOption = null;
        if (this.currentCategory !== "") {
            this.list = this.product.filter(item => item.category === this.currentCategory);
        } else this.list = this.product;
    }

    filterCategory = (category, data = this.product) => {
        this.currentCategory = category
        if (category !== "") {
            this.list = data.filter(item => item.category === category);
        }
        this.reset()


    }

     getProducts = async () => {
        this.isLoading = true;
        let products = await this.employeeService.getEmployees(apiProdUrl);
        let category =await this.employeeService.getEmployees(apiCategUrl);
         this.setProducts(products);
         this.setCategory(category);
         this.setMinMaxPrice();
         this.setList(products);
         this.isLoading = false;
        //     runInAction(() => {
        //         this.setProducts(products);
        //         this.setCategory(category);
        //         this.setMinMaxPrice();
        //         this.setList(products);
        //         this.isLoading = false;
        // })
    }

    getProduct = (id) => {
        return this.product.length? this.product.find(item=>item.id === id) : {}
    }

    // * getProductsFlow() {
    //     this.isLoading = true;
    //     const product = yield this.employeeService.getEmployeesAsyncAwait(apiProdUrl);
    //     const category = yield this.employeeService.getEmployeesAsyncAwait(apiCategUrl);
    //     this.setProducts(product);
    //     this.setCategory(category);
    //     this.setMinMaxPrice()
    //     this.setList(product)
    //     this.isLoading = false;
    // }

}