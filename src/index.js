 import "./index.scss";
import React from "react";
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom"
import { router } from "./app";
 import { ApolloProvider } from '@apollo/client';
import { LanguageProvider } from "./context/setting"
 import rootStore from "./store/rootStore";
 import {client} from "./appolo/cashe";



 const { productStore } = rootStore;
 productStore.getProducts();

createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <LanguageProvider>
                <RouterProvider router={router}/>
            </LanguageProvider>
        </ApolloProvider>
    </React.StrictMode>
);