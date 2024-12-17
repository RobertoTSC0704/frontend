import{BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ProductsPage from './pages/ProductsPage'
import ProductsFormPage from './pages/ProductsFormPage'
import ProtectedRoute from './ProtectedRoute';
import CatalogoPage from './pages/CatalogoPage';
import {ProductsProvider} from './context/ProductContext';
import NavBar from './components/Navbar';
import NotFound from './pages/NotFound';
import { SalesProvider } from './context/SalesContext';


function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <SalesProvider>
        <BrowserRouter
          future = {{
            v7_startTransition:true,
            v7_relativeSplatPath:true,
          }}
          >
          <main className='container mx-auto px-10'>
          <NavBar/>
          <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          
                     

          {/*selecion de rutas protegidas*/}
          <Route element={<ProtectedRoute/>}>
          
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/add-product" element={<ProductsFormPage/>}/>
            <Route path="/products/:id" element={<ProductsFormPage/>}/>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
           
          </Route>
          <Route path='*' element={<NotFound/>}/>
          </Routes>
          </main>
        </BrowserRouter>
        </SalesProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App
