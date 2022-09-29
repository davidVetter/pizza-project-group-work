import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

const defaultOrder = {
        customer_name: "Donatello",
        street_address: "20 W 34th St",
        city: "New York",
        zip: "10001",
        total: "27.98",
        type: "Pickup",
        pizzas: [{
          id: "1",
          quantity: "1"
        },{
          id: "2",
          quantity: "1"
        }]
};

const menuReducer = (state = [], action) => {
    if (action.type === 'SET_MENU') {
        return action.payload;
    }
    return state;
}

const orderReducer = (state = defaultOrder, action) => {
    if (action.type === 'SET_PIZZAS_TOTAL') {
        let pizzas = action.payload[0];
        let orderTotal = action.payload[1];
        let updatedOrder = {...state};
        updatedOrder.total = orderTotal;
        updatedOrder.pizzas = pizzas;
        console.log('This is updatedOrder in SET_PIZZA: ', updatedOrder);
        return updatedOrder;
    } else if (action.type === 'SET_CUSTOMER_INFO') {
        let customer_name = action.payload.customer_name;
        let street_address = action.payload.street_address;
        let city = action.payload.city;
        let zip = action.payload.zip;
        let type = action.payload.type;
        let updatedCustomer = {...state};
        updatedCustomer = {
            customer_name,
            street_address,
            city,
            zip,
            total: state.total,
            type,
            pizzas: state.pizzas
        }
        console.log('This is updatedCustomer in SET Customer: ', updatedCustomer);
        return updatedCustomer;
    }
    return state;
}

const storeInstance = createStore(
    combineReducers({
        menu: menuReducer,
        order: orderReducer
    }),
    applyMiddleware(logger)
)


ReactDOM.render(
    <Provider store={storeInstance}>
        <App />
    </Provider>, 
    document.getElementById('root'));
