import { Link } from 'react-router-dom';
import './Item.css'


const Item = ({name, category, price, img, id}) => {

    return (
        <article>
            <h4>categoria: {category}</h4>
            <h3>{name}</h3>
            <img className='img' src={img} />
            <p>{price}</p>
            <Link to={`/item/${id}`} >Ver Detalle</Link>
        </article>
    )
}

export default Item;