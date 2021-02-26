import { useRouter } from 'next/router'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'
import useCart from '../hook/useCart'

const Container = styled.div`
    overflow-y: auto;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    background: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    transform: translateX(${props => props.isOpen ? '0%':'100%'});
    transition: transform .5s ease-out;
    width: 30vw;
    @media (max-width: 600px) {
        width: 55vw;
    }

    h3#title {
        margin: 0 1rem .25rem;
        font-size: 2rem;
    }
    p {
        font-size: .75rem;
        margin: 2rem 1rem 1rem;
    }
    div#total-price {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
        font-weight: 700;
        margin: 1rem auto;

        span {
            font-size: 1rem;
            font-weight: 400;
            margin-left: .5rem;
        }
    }
`
const IconWrapper = styled.div`
    padding: 1rem 1rem 0;
    align-self: flex-end;
`
const CloseIcon = styled(IoClose)`
    width: 1.75rem;
    height: 1.75rem;
`
const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    font-size: .75rem;

    div.top {
        display: grid;
        grid-template-columns: 0.2fr 1.6fr 0.2fr;
        grid-gap: .25rem;
        align-items: center;
        
        span {
            margin: 0;
        }
        span.button {
            justify-self: right;
            display: flex;
            flex-direction: column;
            
            button {
                padding: .15rem .35rem;
                border-radius: .15rem;
                border: 1px solid white;
                outline: none;
                &:active {
                    border: 1px solid black;
                }
                &:hover {
                    cursor: pointer;
                }
            }
            button:first-child {
                margin-bottom: .25rem;
                color: white;
                background: #f3c600;
            }
        }
    }
    div.bottom {
        align-self: flex-end;
        margin: .5rem 0 1rem;
        width: 75px;
        p {
            font-weight: 600;
            margin: 0;
        }
    }
`
const Button = styled.button`
    margin: 0 1rem 1rem;
    padding: .5rem 0;
    background: transparent;
    border: 1px solid #717171;
    color: #717171;
    outline: none;
    transition: color .5s ease, border .3s ease;

    &:hover {
        cursor: pointer;
        color: #f3c600;
        border-color: #f3c600;
    }
`

const SideCart = () => {
    const router = useRouter()
    const { cart, addToCart, removeFromCart, isOpen, closeSideCart, total } = useCart()

    function substractProduct(item) {
        if (item.qty > 1) {
            addToCart(item, -1)
        } else {
            removeFromCart(item)
        }
    }
    
    function handleCheckout() {
        closeSideCart()
        router.push('/checkout')
    }

    return (
        <Container isOpen={isOpen}>
            <IconWrapper>
                <CloseIcon onClick={closeSideCart}/>
            </IconWrapper>
            <h3 id="title">Cart</h3>
            {cart.map(item => (
                <ProductCard key={item.id}>
                    <div className="top">
                        <span>{item.qty}&times;</span>
                        <span>{item.title}</span>
                        <span className="button">
                            <button onClick={() => addToCart(item)}>+</button>
                            <button onClick={() => substractProduct(item)}>-</button>
                        </span>
                    </div>
                    <div className="bottom">
                        <p>${item.price}</p>
                    </div>
                </ProductCard>
            ))}
            {Boolean(cart.length !== 0) ? (
                <>
                    <div id="total-price">TOTAL <span> ${total}</span></div>
                    <Button onClick={handleCheckout}>CHECKOUT</Button>
                </>
                ) : (
                    <p>Let's check our products and add to this cart...<br/><br/>Happy shopping!</p>
                )
            }
        </Container>
    )
}

export default SideCart