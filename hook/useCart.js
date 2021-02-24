import { useContext } from 'react'
import { CartContext } from '../context/Cart'

const useCart = () => useContext(CartContext)

export default useCart