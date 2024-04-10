import { useContext, useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css'
import { useNotification } from '../../notification/hooks/useNofitication';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

const ItemDetail = ({id, name, category, img, price, stock, description}) => {
   
    const [ finish, setFinish ] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const { addItem } = useContext(CartContext);
    const { showNotification } = useNotification();

    const handleOnAdd = (quantity) => {
        setFinish(true)
        const objProductToAdd = {
            id, name, img, price, quantity
        }
        setQuantity(quantity)
        showNotification('Agregado', 'success', `Se agrego correctamente ${quantity} ${name} al carrito de compras.`)
        addItem(objProductToAdd)
    }
    return (
    <div className='container-card'>
        <div className='card'>
        <h4>categoria: {category}</h4>
        <h3>{name}</h3>
        <img src={img} />
        <p>{price}</p>
        <h4>Descripcion: {description}</h4>
        <footer >              
                        {
                            finish === false ? (
                                <ItemCount onAdd={ handleOnAdd } stock={ stock }/>
                            ) : (
                                <>
                                    <Link to='/cart'>Finalizar compra</Link>
                                    <Link to='/' >Ver otros productos</Link>
                                </>
                            )
                        }
                    </footer>
        </div>
    </div>
    )
}

export default ItemDetail;