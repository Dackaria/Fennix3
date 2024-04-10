import './ItemDetailContainer.css'
import { useEffect, useState } from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom'; 
import { getDoc, doc,  } from 'firebase/firestore';  
import { db } from  '../../services/firebase/firebaseConfig.js';

const ItemDetailContainer = () => {

    const [product, setProduct] = useState(null);
    
    const { itemId } = useParams()

    useEffect(() => {
       const productDoc = doc(db, "products", itemId)
       
        getDoc(productDoc)
        .then(queryDocumentSnapshot =>{
            const data = queryDocumentSnapshot.data()
            const productAdapted = {id: queryDocumentSnapshot.id, ...data}
            
            setProduct(productAdapted)
        })
        .catch()

    }, [itemId])

    return (
        <div className='detail-container'>
            <h1>Detalle del Producto</h1>
            {product ? <ItemDetail {...product}/> : <p>Cargando...</p>}
        </div>
    )
}

export default ItemDetailContainer;