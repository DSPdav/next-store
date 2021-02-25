import { createGlobalStyle } from 'styled-components'
import CartProvider from '../context/Cart'
import Navbar from '../components/Navbar'
import SideCart from '../components/SideCart'
import Footer from '../components/Footer'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    color: #414141;
    user-select: none;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  * {
    box-sizing: border-box;
  }
`


function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle/>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
        <SideCart />
        <Footer/>
      </CartProvider>
    </>
  )
}

export default MyApp
