import {useState} from "react";
import {useDispatch, useSelector } from 'react-redux';
import "./PizzaItem.css"


function PizzaItem({id, name, description, price, image_path}) {
    const dispatch = useDispatch();

    // track state of add btn for conditional render of btn (add/remove)
    const [isAdded, setIsAdded] = useState(false);


    function addToCart (pizzaId, price) {
        const quantity = 1;
        const action = {
            type: 'ADD_PIZZA',
            payload: {pizzaId, quantity, price}
        }
        console.log('dispatching ADD)_PIZZA', action);
        dispatch(action);
    }

    function removeFromCart(pizzaId, price){
        const quantity = 1;
        const action = {
            type: 'REMOVE_PIZZA',
            payload: {pizzaId, quantity, price}
        }
        console.log('dispatching REMOVE_PIZZA', action);
        dispatch(action);

    }

    
    return(
        <li className="pizza-list-item">
            <img className="pizza-img" src={image_path}/>
            <div>
                <h3 className="pizza-name">{name}</h3>
                <p className="pizza-descript">{description}</p>
                <p className="pizza-price">{price}</p>
                {isAdded 
                    ? <button className="add-remove-btn" onClick={()=> {setIsAdded(false); removeFromCart({id, price})}}>Remove</button> 
                    : <button  className="add-remove-btn" onClick={()=>{setIsAdded(true); addToCart({id, price})}}>Add</button>}
            </div>
        </li>
    )

}

export default PizzaItem;