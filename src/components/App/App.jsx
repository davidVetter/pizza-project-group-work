import React from 'react';
import axios from 'axios';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import Checkout from '../Checkout/Checkout';
import SelectPizza from '../SelectPizza/SelectPizza';
// import CustomerForm from '../CustomerForm/CustomerForm';
import Header from '../Header/Header';

// import AdminOrder from '../AdminOrders/AdminOrder';

function App() {

  

  return (
    <div className='App'>
      <Header />

      <SelectPizza />
      {/* <CustomerForm /> */}

      {/* <Checkout /> */}
      {/* <AdminOrders /> */}
      <img src='images/pizza_photo.png' />
      <p>Pizza is great.</p>
  
    </div>
  );
}

export default App;
