import './ItemList.css'
import Item from '../Item/Item'

const ItemList = ({products}) => {
    return (
        <div className='Item-list'>
            {
                products.map(product => {
                    return <Item key= {product.id} { ... product}/>
                })
            }
        </div>
    )
}

export default ItemList;