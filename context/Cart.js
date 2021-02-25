import { useState, useEffect, createContext } from 'react'

export const CartContext = createContext()

const Cart = ({children}) => {
    const getInitialCart = () => {
        return JSON.parse(window.localStorage.getItem('cart'))
    }
    const [cart, setCart] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    function openSideCart() {
        setIsOpen(true)
    }
    function closeSideCart() {
        setIsOpen(false)
    }

    function addToCart(product, qty = 1) {
        const selectedProduct = cart.find(item => item.id === product.id)

        if (selectedProduct) {
            const prevProducts = cart.filter(item => item.id !== selectedProduct.id)
            selectedProduct.qty += qty
            setCart([{...selectedProduct}, ...prevProducts])
        } else {
            setCart([...cart, {...product, qty}])
        }
    }
    function removeFromCart(product) {
        const newCart = cart.filter(item => item.id !== product.id)
        setCart(newCart)
    }

    useEffect(() => {
        let initial = getInitialCart()
        if (initial) {
            setCart(initial)
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const exposeValues = {
        cart, 
        addToCart, 
        removeFromCart,
        isOpen,
        openSideCart,
        closeSideCart
    }

    return (
        <CartContext.Provider value={exposeValues}>
            {children}
        </CartContext.Provider>
    )
}

export default Cart