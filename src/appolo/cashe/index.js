import {ApolloClient, InMemoryCache} from "@apollo/client";
import {categoryItemsVar, currentUserVar, productChangeItemsVar} from "./appVar";

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                categoryLocal: {
                    read() {
                        return categoryItemsVar();
                    }
                },
                productList: {
                    read() {
                        return productChangeItemsVar();
                    }
                },
                currentUser :{
                    read() {
                        return currentUserVar();
                    }
                }
            }
        }
    }
});

export const client = new ApolloClient({
    uri: 'https://nameless-brook-400334.eu-central-1.aws.cloud.dgraph.io/graphql',
    cache
});