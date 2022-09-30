import axios from "axios";
import {useState} from 'react';

import {useSelector} from 'react-redux';

function AdminOrder(){
    const allOrders = useSelector(store => store.allOrders);

    return (
        <div>
            <h1>Admin: ALL ORDERS</h1>
            <table>
                <thead>
                    <tr><th>Name</th><th>Time of Order</th><th>Type</th><th>Cost</th></tr>
                </thead>
                <tbody>
                    {allOrders.map((order)=>{
                        return(
                            <tr><td>order.name</td><td>TIME</td><td>order.type</td><td>order.total</td></tr>
                        )
                    })}
                    
                </tbody>
            </table>


        </div>
    )


}

export default AdminOrder;