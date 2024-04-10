import './Navbar.css';
import fennix from '../../assets/fennix.png'
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import  { db } from '../../services/firebase/firebaseConfig.js';

const Navbar = () => {

    const [categories, setCategories] = useState()
    
    useEffect(() => {
        const categoriesCollection = collection (db, "categories");
        
        getDocs(categoriesCollection)
          .then((querySnapshot) => {
            const categoriesAdapted = querySnapshot.docs.map(doc =>{
                const data = doc.data()
                return { id: doc.id, ...data}
            })
            setCategories(categoriesAdapted)
          })

     })
    return(
        <div className='barrita'>
        <Link to=  '/'> 
        <img className="logo" src={fennix}/>
        </Link>
        <nav className="navbar">
            <Link to='/category/mochila' >Mochilas</Link>
            <Link to='/category/billetera'>Billeteras</Link>
            <Link to='/category/cartera'>Carteras</Link>
        </nav>
        <CartWidget/>
        </div>
    )
}

export default Navbar