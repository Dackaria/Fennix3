import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"
import { Link } from "react-router-dom"

const CartView = () => {
    const { cart, removeItem } = useContext(CartContext)

    const total = cart.reduce((accumulator, currentProduct) => {
        return accumulator + (currentProduct.price * currentProduct.quantity);
    }, 0);

    return (
        <div>
            <h1>Cart</h1>
            <section>
            {
                cart.map(prod => {
                    return (
                        <article key={prod.id} >
                            <h2>{prod.name}</h2>
                            <p>Precio: ${prod.price}</p>
                            <p>Cantidad: {prod.quantity}</p>
                            <button onClick={() => removeItem(prod.id)}>Eliminar</button>
                        </article>
                    )
                })
            }
            </section>
            <p>Total: ${total}</p>
            <Link to='/checkout'>Checkout</Link>
        </div>
    )
}

export default CartView