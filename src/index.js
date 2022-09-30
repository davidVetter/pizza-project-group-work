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
          id: 1,
          quantity: 1
        },{
          id: 2,
          quantity: 1
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
    } else if (action.type === 'ADD_PIZZA') {
        // debugger;
        let updatedOrder = {...state};
        let updatedPizzas = updatedOrder.pizzas;
        updatedOrder.total = Number(updatedOrder.total);
        for (let i=0; i < updatedPizzas.length; i++) {
            console.log('This is updatedPizza.id: ', updatedPizzas[i].id, 'This is payload.id: ', action.payload.id);
            if (Number(updatedPizzas[i].id) === Number(action.payload.id)) {
                updatedOrder.total += Number(action.payload.price);
                updatedPizzas[i].quantity += 1;
                updatedOrder.pizzas = updatedPizzas;
                return updatedOrder;
            } else {
                let addObj = {
                    id: action.payload.id,
                    quantity: action.payload.quantity
                }
                updatedOrder.pizzas.push(addObj);
                updatedOrder.total += Number(action.payload.price);
            }
        }
        return updatedOrder;
    } else if (action.type === 'REMOVE_PIZZA') {
        let updatedOrder = {...state};
        let updatedPizzas = updatedOrder.pizzas;
        updatedOrder.total = Number(updatedOrder.total);
        for (let i=0; i < updatedPizzas.length; i++) {
            if (updatedPizzas[i].quantity === 1 && Number(updatedPizzas[i].id) === Number(action.payload.id)) {
                updatedOrder.total -= Number(action.payload.price);
                updatedPizzas.splice(i, 1);
            } else if (updatedPizzas[i].quantity > 1 && Number(updatedPizzas[i].id) === Number(action.payload.id)) {
                updatedPizzas[i].quantity -= 1;
                updatedOrder.total -= Number(action.payload.price);
            }
        }
        updatedOrder.pizzas = updatedPizzas;
        return updatedOrder;
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
