import {ApolloClient, InMemoryCache} from "@apollo/client";
import {categoryItemsVar, productChangeItemsVar} from "./productVar";

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
                }
            }
        }
    }
});

export const client = new ApolloClient({
    uri: 'https://nameless-brook-400334.eu-central-1.aws.cloud.dgraph.io/graphql',
    cache
});