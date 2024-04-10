import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemCount from './components/ItemCount/ItemCount'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Navbar from './components/Navbar/Navbar'
import { CartProvider } from './Context/CartContext';
import { NotificationProvider } from './notification/NotificationService';
import CartView from './components/CartView/CartView';
import Checkout from './components/Checkout/Checkout';

function App() {

  return (
    <>
      <NotificationProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<ItemListContainer greeting={'Bienvenidos'} />} />
            <Route path='/item/:itemId' element={<ItemDetailContainer />} />
            <Route path='/category/:categoryId' element={<ItemListContainer greeting={'Productos de la categoria: '} />} />
            <Route path='/cart' element={ <CartView/>}/>
            <Route  path="/checkout" element={<Checkout/>}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
      </NotificationProvider>
    </>
  )
}

export default App
