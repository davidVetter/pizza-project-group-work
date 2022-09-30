import React from 'react';
import axios from 'axios';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Checkout from '../Checkout/Checkout';
import SelectPizza from '../SelectPizza/SelectPizza';
import CustomerForm from '../CustomerForm/CustomerForm';
import Header from '../Header/Header';
import AdminOrder from '../AdminOrders/AdminOrder';
import {HashRouter as Router, Route, NavLink, Switch} from "react-router-dom";


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
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/' exact>
            <SelectPizza />
          </Route>
        
        
          <Route path='/customerForm'>
            <CustomerForm />
          </Route>
        
        
          <Route path='/checkout'>
            <Checkout />
          </Route>
        
        
        <Route path='/admin'>
          <AdminOrder />
        </Route>
        </Switch>
    
      </div>
    </Router>
  );
}

export default App;
