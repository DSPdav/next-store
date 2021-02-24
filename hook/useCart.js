import { useState, useEffect } from 'react'

const useCart = () => {
    const getInitialCart = () => {
        return JSON.parse(window.localStorage.getItem('cart'))
    };
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
        setCart(getInitialCart())
    }, [])

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return {
        cart,
        addToCart,
        removeFromCart
    }
}

export default useCart