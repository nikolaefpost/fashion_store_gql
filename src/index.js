 import "./index.scss";


// import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom"
import { router } from "./app";
 import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { LanguageProvider } from "./context/setting"
 import rootStore from "./store/rootStore";
// import rootStore, { RootContext } from "./context/rootStore";
// import {OrderProvider} from "./context/orderData";
// import {UserProvider} from "./context/user";

 const client = new ApolloClient({
     uri: 'https://nameless-brook-400334.eu-central-1.aws.cloud.dgraph.io/graphql',
     cache: new InMemoryCache(),
 });

 const { productStore } = rootStore;
 productStore.getProducts();

createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
        {/*<RootContext.Provider value={rootStore}>*/}
            {/*<UserProvider>*/}
            {/*<OrderProvider>*/}

            <LanguageProvider>
                <RouterProvider router={router}/>
            </LanguageProvider>
            {/*</OrderProvider>*/}
            {/*</UserProvider>*/}
        {/*</RootContext.Provider>*/}
        </ApolloProvider>
    </React.StrictMode>
);

// import "./test/testCard"