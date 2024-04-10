import './ItemCount.css'
import { useState } from "react"

const ItemCount = ({initial = 0, stock, onAdd}) => {
   
    const [count, setCount] = useState(initial)
   
    const decrement = () => {
        if (count > initial) {
            setCount(c => c - 1)
        }
    }
    const increment = () => {
        if (count < stock) {
            setCount(c => c + 1)
        }
    }
    
    return (
    <div className='counter'>
        <div className="item-count">
          <button  onClick={decrement}>-</button>
             <h2> {count} </h2>
         <button  onClick={increment}>+</button>
        </div>
        <div>
          <button onClick={() => onAdd(count)}>Agregar al carrito</button>
        </div>
    </div>)
}

export default ItemCount