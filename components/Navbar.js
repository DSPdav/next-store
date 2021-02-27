import Link from 'next/link'
import styled from 'styled-components'
import { GrCart } from 'react-icons/gr'
import useCart from '../hook/useCart'

const Nav = styled.nav`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 100%;
  background: #dbdbdb;

  div#wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    margin: 0 auto;
    padding: 1rem;
    align-self: flex-start;
  }

  a#logo {
    font-size: 1.75rem;
    font-weight: 700;
    transition: color 0.5s ease;  
    &:hover {
      color: #717171;
    }
  }
`

const CartIcon = styled(GrCart)`
  width: 1.5rem;
  height: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`

const Navbar = () => {
  const { openSideCart } = useCart()

  return (
    <Nav>
      <div id="wrapper">
        <Link href="/"><a id="logo">NexStore</a></Link>
        <div>
          <CartIcon onClick={openSideCart}/>
        </div>
      </div>
    </Nav>
  )
}

export default Navbar