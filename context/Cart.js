import { useState, useEffect, createContext } from 'react'

export const CartContext = createContext()

const Cart = ({children}) => {
    const getInitialCart = () => JSON.parse(window.localStorage.getItem('cart'))
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
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
        const initialCart = getInitialCart()
        if (initialCart) {
            setCart(initialCart)
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
        if (cart) {
            const newTotal = cart.reduce((acc, cur) => acc + (cur.qty * cur.price), 0)
            setTotal(parseFloat((newTotal).toFixed(2)))
        }
    }, [cart])

    const exposeValues = {
        cart, 
        addToCart, 
        removeFromCart,
        isOpen,
        openSideCart,
        closeSideCart,
        total
    }

    return (
        <CartContext.Provider value={exposeValues}>
            {children}
        </CartContext.Provider>
    )
}

export default Cart