import {useSelector} from 'react-redux';
import {useState} from 'react';
import './TotalCost.css';
    


function TotalCost () {
    const [cartShown, setCartShown] = useState(false);

    const total = useSelector(store => store.order.total);
    console.log(total);

    return (
        <>
            <div id="total-cost-cart"
                onMouseEnter={()=>setCartShown(true)}
                onMouseLeave={()=>setCartShown(false)}>
                🛒 Total: {total}
            </div>
            {cartShown 
                ?<div className="cart-dropdown">
                    Total:
                    other stuff:
                    this stuff too:
                </div>
                :<div className="hidden"></div>}
        </>
    )
}

export default TotalCost;