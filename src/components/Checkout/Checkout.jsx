import { useSelector } from "react-redux";
import { useState } from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';

function Checkout({setAllOrders}) {
    const customer = useSelector(store => store.order);
    const menu = useSelector(store => store.menu);
    // const [zipState, setZipState] = useState('ND');
    const [pizzaName, setPizzaName] = useState('');
    const [pizzaCost, setPizzaCost] = useState(0);
    const history = useHistory();

    function postOrder () {
        console.log('sending', customer);
        axios({
            method: 'POST',
            url: '/api/order',
            data: customer
        }).then((response)=>{
            console.log('POST Successful');
            setAllOrders();
            history.push('/')
        }).catch(error => console.log('error with post', error));
        


    }

    function getState() {
        let zipState = '';
        console.log(customer);
        if ((customer.zip[1] === '5' && customer.zip[0] === '5') || customer.zip[0] === '5' && customer.zip[1] === '6') {
            zipState = 'MN';
        } else {
            zipState = 'ND';
        }
        console.log('This is zipState: ', zipState);
        return zipState;
    }       

    function getPizzaName(id) {
        console.log('This is id: ', id);
        // let selectedPizza = menu.filter(pizza => (pizza.id === id));
        let selectedPizza = '';
        for (let pizza of menu) {
            if (pizza.id === id) {
                selectedPizza = pizza.name;
            }
        }
        console.log('This is selected pizza: ', selectedPizza);
        // setPizzaName(selectedPizza);
        return selectedPizza;
    }

    function getPizzaCost(id, quantity) {
        console.log('This is id: ', id,'quant', quantity);
        let onePizzaCost = 0;
        for (let pizza of menu) {
            if (pizza.id === id) {
                onePizzaCost = pizza.price;
            }
            

        
        }
        return onePizzaCost * quantity;
    }


    return (
        <>
            <h3>Step 3: Checkout</h3>
            <div className="custCheckoutInfoDiv">
                <div className="custInfoDiv">
                    <p>{customer.customer_name}</p><br />
                    <p>{customer.street_address}</p>
                    <p>{customer.city}, {getState()} {customer.zip}</p>
                </div>
                <div className="orderTypeDiv">
                    <p>{customer.type}</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.pizzas.map((pizza, index) => 
                        <tr key={index}>
                            <td>{getPizzaName(pizza.id)}</td>
                            <td>{pizza.quantity}</td>
                            <td>{getPizzaCost(pizza.id, pizza.quantity)}</td>
                        </tr>)}
                </tbody>
            </table>
            <button onClick={()=>postOrder()}>Submit Order</button>
        </>
    )
}

export default Checkout;