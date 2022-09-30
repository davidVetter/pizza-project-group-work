import React from 'react';
import axios from 'axios';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import Checkout from '../Checkout/Checkout';
import SelectPizza from '../SelectPizza/SelectPizza';
import CustomerForm from '../CustomerForm/CustomerForm';

// import AdminOrder from '../AdminOrders/AdminOrder';

function App() {

  





  const dispatch = useDispatch();
function test() {
  dispatch({
    type: 'SET_CUSTOMER_INFO',
    payload: {
      customer_name: 'John',
      street_address: '123 St W',
      city: 'ANother CIty',
      type: 'Delivery',

    }
  })
}
useEffect(() => {
  test();
}, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Prime Pizza</h1>
      </header>

      <SelectPizza />
      <CustomerForm />

      {/* <Checkout /> */}
      {/* <AdminOrders /> */}
      <img src='images/pizza_photo.png' />
      <p>Pizza is great.</p>
  
    </div>
  );
}

export default App;
