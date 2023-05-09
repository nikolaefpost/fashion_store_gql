import React from 'react';
import {createHashRouter} from "react-router-dom";
import {
    Catalog,
    Order,
    Layout,
    Error404,
    Home,
    Product,
    PersonalArea,
    ExchangeReturn,
    Favorites,
    Contacts,
    AboutUs,
    BonusSystem,
    PaymentDelivery,
    PublicOffer
} from "./pages";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";





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
                path: "payment&delivery",
                element: <PaymentDelivery/>,
            },
            {
                path: "bonus_system",
                element: <BonusSystem/>,
            },
            {
                path: "favorites",
                element: <Favorites/>,
            },
            {
                path: "about_us",
                element: <AboutUs/>,
            },
            {
                path: "contacts",
                element: <Contacts/>,
            },
            {
                path: "public_offer",
                element: <PublicOffer/>,
            },
            {
                path: "privacy_policy",
                element: <PrivacyPolicy/>,
            },
            {
                path: "*",
                element: <Error404/>,
            },
        ],
    },
]);