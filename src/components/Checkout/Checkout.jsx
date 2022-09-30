import { useSelector } from "react-redux";
import { useState } from 'react';

function Checkout() {
    const customer = useSelector(store => store.order);
    const menu = useSelector(store => store.menu);
    const [zipState, setZipState] = useState('ND');
    const [pizzaName, setPizzaName] = useState('');

    if (customer.zip[1] === '5' || customer.zip[1] === '6') {
        setZipState('MN');
    } else {
        setZipState('ND');
    }

    function getPizzaName(id) {
        let selectedPizza = menu.filter(pizza => (pizza.id === id));
        console.log('This is selected pizza: ', selectedPizza);
        setPizzaName(selectedPizza);
        return pizzaName;
    }


    return (
        <>
            <h3>Step 3: Checkout</h3>
            <div className="custCheckoutInfoDiv">
                <div className="custInfoDiv">
                    <p>{customer.customer_name}</p><br />
                    <p>{customer.street_address}</p>
                    <p>{customer.city}, {zipState} {customer.zip}</p>
                </div>
                <div className="orderTypeDiv">
                    <p>{customer.type}</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.pizza.map((pizza, index) => 
                        <tr key={index}>
                            <td>{getPizzaName(pizza.id)}</td>
                            <td>{pizza.quantity}</td>
                            <td>{getPizzaCost(pizza.id, pizza.quantity)}</td>
                        </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default Checkout;