import React from 'react';
import {createHashRouter} from "react-router-dom";
import {Catalog, Order, Layout, Error404, Home, Product, PersonalArea, ExchangeReturn} from "./pages";




export const router = createHashRouter([
    {
        // path: "",
        element: <Layout  />,
        children: [
            {
                path: "",
                element: <Home  />,
            },
            {
                path: "card",
                element: <Catalog  />,
            },
            {
                path: "card/:cardId",
                element: <Product />,
            },
            {
                path: "order",
                element: <Order/>,
            },
            {
                path: "personal",
                element: <PersonalArea/>,
            },
            {
                path: "exchange",
                element: <ExchangeReturn/>,
            },
            {
                path: "*",
                element: <Error404/>,
            },
        ],
    },
]);