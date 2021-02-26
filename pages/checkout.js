import useCart from '../hook/useCart'
import styled from 'styled-components'

const Main = styled.main`
    min-height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1rem;
    
    div#display-products {
        max-width: 800px;
        margin: 0 auto;
    }
    div#total-price {
        margin: 1rem 0;

        span {
            font-weight: 700;
        }
    }
`
const ProductCard = styled.div`
    display: grid;
    grid-template-columns: 0.05fr 1.65fr 0.35fr;
    grid-gap: .75rem;
    align-items: center;
    margin-bottom: .5rem;
    font-size: 1rem;

    @media screen and (max-width: 600px) {
        font-size: .75rem;
    }
`

const Checkout = () => {
    const { cart, total } = useCart()

    return (
        <Main>
            <h1>Checkout Page</h1>
            <div id="display-products">
                {cart.map(item => (
                    <ProductCard key={item.id}>
                        <span>{item.qty}&times;</span>
                        <span>{item.title}</span>
                        <span>${item.price}</span>
                    </ProductCard>
                ))}
            </div>
            {cart.length !== 0 ? (
                <>
                    <div id="total-price">TOTAL <span>${total}</span></div>
                </>
                ) : (
                    <p>Sorry.. there is no items in your cart!</p>
                )
            }
        </Main>
    )
}

export default Checkout
