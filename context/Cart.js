import { useState, useEffect, createContext } from 'react'

export const CartContext = createContext()

const Cart = ({children}) => {
    const getInitialCart = () => {
        return JSON.parse(window.localStorage.getItem('cart'))
    }
    const [cart, setCart] = useState([])
    

    function addToCart(id, qty = 1) {
        const item = cart.find(product => product.id == id)

        if (item) {
            const prevCart = cart.filter(product => product.id !== item.id)
            item.qty += qty
            setCart([...prevCart, {id: item.id, qty: item.qty}])            
        } else {
            setCart([...cart, {id, qty}])
        }
    }
    function removeFromCart(id) {
        const newCart = cart.filter(item => item.id !== id)
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



    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default Cart