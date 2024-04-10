import './Checkout.css';
import { useNotification } from '../../notification/hooks/useNofitication.jsx';
import { useContext, useState } from 'react';
import { getDocs, collection, query, where, documentId, writeBatch, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { CartContext } from '../../Context/CartContext';

const Checkout = () => {
    
    const { showNotification } = useNotification();
    const { cart, total, clearCart } = useContext(CartContext);
    const [ loading, setLoading ] = useState(false);
    const [ orderId, setOrderId ] = useState(null);
    
    const createOrder = async (userData) => {
        userData.preventDefault()
        setLoading(true)

        const formData = new FormData(userData.target);
        
        try {
            const objOrder = {
                buyer: {
                    name: formData.get('name'),
                    address: formData.get('address'),
                    city: formData.get('city'),
                    phone: formData.get('phone'),
                    email: formData.get('email')
                },
                items: cart,
                total: total,
                date: Timestamp.fromDate(new Date())
            }

            const batch = writeBatch(db)
            const outOfStock = []
            const ids = cart.map(prod => prod.id)
            const productsCollection = query(collection(db, 'products'), where(documentId(), 'in', ids))

            const querySnapshot = await getDocs(productsCollection)
            const { docs } = querySnapshot
        
            docs.forEach(doc => {
                const data = doc.data()
                const stockDb = data.stock
        
                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart.quantity
        
                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...data})
                }
            })
        
            if (outOfStock.length === 0) {
                batch.commit() 
                const orderCollection = collection(db, 'orders')
                const { id } = await addDoc(orderCollection, objOrder)
                
                clearCart()
                setOrderId(id)
            } else {
                console.error('Falta stock. No se generó la orden de compra')
                showNotification('Error', 'error', `Falta stock. No se pudo generar la orden de compra`)
            }       
        } 
        catch (error) {
            console.error('Error al generar la orden de compra')
            showNotification('Error', 'error', `Ocurrió un error al generar la orden de compra`)
        } 
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Checkout</h1>

            { !orderId && 
                <form onSubmit={ createOrder } >
                    <div >
                        <div >
                            <label htmlFor="inputName" >Nombre completo</label>
                            <input type="text" id="inputName" name='name' required/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="inputAdress" >Dirección</label>
                            <input type="text" id="inputAdress" name='address' required/>
                        </div>
                    </div>
                    <div >
                        <div >
                            <label htmlFor="inputCity" >Ciudad</label>
                            <input type="text" id="inputCity" name='city' required/>
                        </div>
                    </div>
                    <div >
                        <div>
                            <label htmlFor="inputPhone" >Número de teléfono</label>
                            <input type="text" id="inputPhone" name='phone' required/>
                        </div>
                    </div>
                    <div >
                        <div >
                            <label htmlFor="inputEmail" >Email</label>
                            <input 
                                type="email" 
                                
                                id="inputEmail" 
                                name='email'
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div >
                            <label htmlFor="inputConfirmEmail" >Confirmar email</label>
                            <input 
                                type="email" 
                                 
                                id="inputConfirmEmail" 
                                name='confirmEmail'
                                required
                            />
                        </div>
                    </div>  
                    <div>
                        <button>Generar orden de compra</button>
                    </div>
                </form>
            }
            {   loading &&
                <div>
                    <h2>Su orden de compra está siendo generada...</h2>
                    <div>
                        <span>Loading...</span>
                    </div>
                </div> 
            }
            { orderId && 
                <div>
                    <h3>¡Gracias por su compra!</h3>
                    <h3>Su orden de compra ha sido generada con éxito con el ID: ${ orderId }</h3>
                </div>
            }
        </div>
    )
}

export default Checkout;