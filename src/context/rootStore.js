import React, {createContext,  useContext, useEffect, useState} from "react";
import {OrderData} from "../store/orderData";
import {UserData} from "../store/userData";

export const RootContext = createContext({});

export class RootStore {
    constructor() {
        this.orderStore = new OrderData(this)
        this.userStore = new UserData(this)
    }
}

export default new RootStore;

export const useRoot = () => useContext(RootContext);