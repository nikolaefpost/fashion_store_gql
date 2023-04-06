import React from 'react';
import Purchase from "../../componets/purchases/Purchase";

const HistoryOrders = ({purchases}) => {

    return (
        <div>
            {purchases.map(el => (
                <Purchase key={el.orderNumber} purchase={el}/>
            ))}
        </div>
    );
};

export default HistoryOrders;