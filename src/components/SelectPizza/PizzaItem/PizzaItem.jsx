import {useState} from "react";
import {useDispatch, useSelector } from 'react-redux';
import "./PizzaItem.css"


function PizzaItem({id, name, description, price, image_path}) {
    const dispatch = useDispatch();

    // track state of add btn for conditional render of btn (add/remove)
    const [isAdded, setIsAdded] = useState(false);


    function addToCart () {
        const quantity = 1;
        const action = {
            type: 'ADD_PIZZA',
            payload: {id, quantity, price}
        }
        console.log('dispatching ADD)_PIZZA', action);
        dispatch(action);
    }

    function removeFromCart(){
        const quantity = 1;
        const action = {
            type: 'REMOVE_PIZZA',
            payload: {id, quantity, price}
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
                    ? <button className="add-remove-btn" onClick={()=> {setIsAdded(false); removeFromCart()}}>Remove</button> 
                    : <button  className="add-remove-btn" onClick={()=>{setIsAdded(true); addToCart()}}>Add</button>}
            </div>
        </li>
    )

}

export default PizzaItem;