import React from 'react';
import axios from 'axios';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import Checkout from '../Checkout/Checkout';
import SelectPizza from '../SelectPizza/SelectPizza';
import CustomerForm from '../CustomerForm/CustomerForm';
import Header from '../Header/Header';
import AdminOrder from '../AdminOrders/AdminOrder';

// import AdminOrder from '../AdminOrders/AdminOrder';

function App() {
  const dispatch = useDispatch();

  function setAllOrders(){

    axios({
        method: 'GET',
        url: '/api/order'
    }).then((response) => {
        const action = {
          type: 'SET_ALL_ORDERS',
          payload: response.data
        }
        dispatch(action);
    }).catch(error => console.log('Error with GET (AdminOrder)', error));

  }


  

  return (
    <div className='App'>
      <Header />
      <SelectPizza />
      <CustomerForm />

      {/* <Checkout /> */}
      <AdminOrder />
  
    </div>
  );
}

export default App;
