import {makeVar} from "@apollo/client";


export const productItemsVar = makeVar([]);
export const productChangeItemsVar = makeVar([]);


export const productCurrentSizeVar = makeVar("");
export const productCurrentColorVar = makeVar("");

export const productMinMax = makeVar({min: 0, max: 184});
export const productInputMinMax = makeVar({});
export const productRatio = makeVar(0);
export const productChangePriseRange = makeVar(false);
export const productMaxPrice = makeVar(0);

export const productSortingOption = makeVar("");

export const categoryItemsVar = makeVar([]);
export const categoryCurrentVar = makeVar("");



export const orderItemsVar = makeVar([]);


export const currentUserVar = makeVar({});
export const userDataVar = makeVar({});
export const isAuthUserVar = makeVar(false);
export const authErrorVar = makeVar('');
export const secondStepVar = makeVar(false);