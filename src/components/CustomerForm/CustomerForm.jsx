import { useDispatch } from "react-redux";
import { useState } from 'react';

function CustomerForm() {

    const [customerName, setCustomerName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [type, setType] = useState('Delivery');
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch({
            type: 'SET_CUSTOMER_INFO',
            payload: {
                customer_name: customerName,
                street_address: streetAddress,
                city: city,
                zip: zip,
                type: type
            }
        });
        e.target.reset();
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <input
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Name"
                value={customerName}
                type="text" />
            <input
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="Street Address"
                value={streetAddress}
                type="text" />
            <input
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                value={city}
                type="text" />
            <input
                onChange={(e) => setZip(e.target.value)}
                placeholder="Zip Code"
                value={zip}
                type="number" />
            <label><input
                type="radio"
                value="Delivery"
                name="type"
                checked={type === 'Delivery'}
                onChange={(e) => setType(e.target.value)}   />
            Delivery</label>&nbsp;
            <label><input
                type="radio"
                value="Pickup"
                name="type"
                checked={type === 'Pickup'}
                onChange={(e) => setType(e.target.value)}  />
            Pickup</label>
            {/* <input value={type}/> */}
            <button type="submit">Submit</button>
        </form>
    )
}

export default CustomerForm;