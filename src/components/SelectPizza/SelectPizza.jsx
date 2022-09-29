import axios from "axios";
import {useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import PizzaItem from "./PizzaItem/PizzaItem";

function SelectPizza () {
    const dispatch = useDispatch();
    const menu = useSelector(store => store.menu);

    // local state to hold current cart
    const [currentCart, setCurrentCart] = useState([]);

    function getMenu(){
        axios.get('/api/pizza')
        .then((response) => {
            dispatch({ type: `SET_MENU`, payload: response.data});
        }).catch( error => {
            console.log('Error with dispatch', error);
        })
    }

    // useEffect => load menu on page load
    useEffect(() => {
        getMenu()   
    }, []);

    return (
        <>  <div id="menu-holder">
                <h1>IN select pizza</h1>
                <ul>
                    {/* map and render seperate components for each pizza type */}
                    {menu.map((item) => {
                        return(
                        <PizzaItem key={item.id} id={item.id} name={item.name} 
                            description={item.description} price={item.price} 
                            image_path={item.image_path}/>
                    )})}
                </ul>
                <button className='next-btn'>Next</button>
            </div>

        </>
    )
}

export default SelectPizza;