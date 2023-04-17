import {
    categoryCurrentVar,
    productChangeItemsVar,
    productChangePriseRange,
    productCurrentColorVar,
    productCurrentSizeVar,
    productInputMinMax,
    productItemsVar,
    productMaxPrice,
    productMinMax,
    productRatio,
    productSortingOption
} from "../../cashe/productVar";


export const filterCategory = (category) => {
    categoryCurrentVar(category)
    resetFilter()
}

export const setSize = (size) => {
    productCurrentSizeVar(size);
}

export const setColor = (color) => {
    productCurrentColorVar(color);
}

export const setMinMaxPrice = () => {
    let data = productItemsVar()
    if (!data) return;
    const {min, max} = productMinMax()
    let maxValue = Math.round(data.reduce((a, b) => a.price > b.price ? a : b).price);
    productMaxPrice(maxValue)
    productRatio(maxValue / 184)
    productInputMinMax({
        min: min * maxValue / 184,
        max: Math.round(max * maxValue / 184)
    })
}

export const setMinPrice = (min) => {
    productMinMax({...productMinMax(), min})
    console.log(Math.round(min * productRatio()))
    productInputMinMax({...productInputMinMax(), min: Math.round(min * productRatio())})
}

export const setMaxPrice = (max) => {
    console.log("setMaxPrice")
    productMinMax({...productMinMax(), max})
    productInputMinMax({...productInputMinMax(), max: Math.round(max * productRatio())})
}

export const setInputMinPrice = (min) => {

    const inputMinMax = productInputMinMax();
    const minMax = productMinMax();

    if (min < inputMinMax.max - 90) {
        productInputMinMax({...inputMinMax, min})
        productMinMax({...minMax, min: min / productRatio()})
    }
}
export const setInputMaxPrice = (max) => {

    let maxValue = max ? max : 0
    const inputMinMax = productInputMinMax();
    const minMax = productMinMax();
    const ratio = productRatio();
    console.log("setInputMaxPrice", maxValue)
    productInputMinMax({...inputMinMax, max: maxValue})

    if (inputMinMax.min === 0) {
        if (maxValue > 15.5 * ratio) productMinMax({...minMax, max: maxValue / ratio});
        else productMinMax({...minMax, max: 15.5});
    } else {
        if (maxValue > inputMinMax.min + 15.5 * ratio) productMinMax({...minMax, max: maxValue / ratio});
        else productMinMax({...minMax, max: inputMinMax.min / ratio + 15.5});
    }
    if (maxValue > productMaxPrice()) productMinMax({...minMax, max: 184})
}

export const setSortingOption = (option) => {
    productSortingOption(option);
}

export const sortListByOption = () => {

    const sortingOption = productSortingOption()
    if (!sortingOption) return
    let list = [...productChangeItemsVar()]
    switch (sortingOption.id) {
        // case 0:
        //     this.list.sort((a, b) => b.rating.rate - a.rating.rate);
        //     break;
        case 0:
            list.sort((a, b) => a.price > b.price ? 1 : -1)
            break;
        case 1:
            list.sort((a, b) => a.price > b.price ? -1 : 1)
            break;
        default:
            this.sortingOption = null;
    }
    productChangeItemsVar(list)
}


export const applyFilter = () => {
    let list = productItemsVar();
    const minMax = productMinMax();
    const inputMinMax = productInputMinMax();

    if (categoryCurrentVar() !== "") {
        list = list.filter(item => item.category.category === categoryCurrentVar())
    }
    if (productCurrentSizeVar() !== "") {
        list = list.filter(item => item.size.some(el => el === productCurrentSizeVar()))
    }
    if (productCurrentColorVar() !== "") {
        list = list.filter(item => item.color.some(el => el.id === productCurrentColorVar()))
    }
    if (minMax.min !== 0 || minMax.max !== 184) {
        productChangePriseRange(true)
        list = list.filter((pr) => pr.price > inputMinMax.min && pr.price <= inputMinMax.max)
    }

    productChangeItemsVar(list)
}

export const resetFilter = () => {
    const data = productItemsVar();
    const currentCategory = categoryCurrentVar();

    productCurrentSizeVar("");
    productCurrentColorVar("");
    productMinMax({min: 0, max: 184})
    productInputMinMax({min: 0, max: 184 * productRatio()})
    productChangePriseRange(false);
    productSortingOption(null);


    if (currentCategory !== "") {
        productChangeItemsVar(data.filter(item => item.category.category === currentCategory));
    } else {
        productChangeItemsVar(data)
    }
}

export const getProduct = (id) => {
    console.log(productItemsVar())
    return productItemsVar()? productItemsVar().find(item=>item.id === id) : {}
}