import axios from "axios";
import { useEffect } from "react";
import {useState} from 'react';

import {useSelector} from 'react-redux';

function AdminOrder(){
    const allOrders = useSelector(store => store.allOrders);
    console.log('in adminOrder', allOrders);

    return (
        <div>
            <h1>Admin: ALL ORDERS</h1>
            <table>
                <thead>
                    <tr><th>Name</th><th>Time of Order</th><th>Type</th><th>Cost</th></tr>
                </thead>
                <tbody>
                    {allOrders.map((order)=>{
                        console.log(order);
                        return(
                            <tr key={order.id}><td>{order.customer_name}</td><td>TIME</td><td>{order.type}</td><td>{order.total}</td></tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    )
}

export default AdminOrder;