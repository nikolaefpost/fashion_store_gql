import React, {createContext,  useContext, useEffect, useState} from "react";

export const OrderContext = createContext({});

export const OrderProvider = ({children}) => {
    const [order, setOrder] = useState([]);

    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>setOrder(json.map(item=>({...item, cmt: 1}))))
    },[]);


    const changeCnt = (id, cmt) => {
        setOrder(prev => prev.map(item => item.id === id ? {...item, cmt}: item))
    }

    const deleteProduct = (id) => {
        setOrder(prev => prev.filter(item => item.id !== id))
    }

    const total = (() => {
        return  order.reduce((acc, cur) => acc + cur.cmt*cur.price, 0).toFixed(2)
    })();


    const value = { order, total, changeCnt, deleteProduct };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);