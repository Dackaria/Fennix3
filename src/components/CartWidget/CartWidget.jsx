import './CartWidget.css'
import cart from  '../../assets/cart.svg';
import { CartContext } from '../../Context/CartContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';


const CartWidget = () => {

    const {totalQuantity} = useContext(CartContext)
    return (
        
        <div className='img-carrito'>
            <Link to= '/Cart'>
            <img src={cart} alt="carrito"/>
            {totalQuantity}
            </Link>
        </div>
    )
}

export default CartWidget;