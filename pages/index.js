import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'
import styled from 'styled-components'
import useCart from '../hook/useCart'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;

  h1 a {
    color: #f3c600;
    text-decoration: none;
  }
  h1 a:hover, h1 a:focus, h1 a:active {
    text-decoration: underline;
  }
  h1 {
    padding: 0 1rem;
    line-height: 1.15;
    font-size: 10vw;
  }
  h1, p {
    text-align: center;
  }
  p {
    line-height: 1.5;
    font-size: 5vw;
  }
`
const Grid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1000px;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`

const Card = styled.div`
  position: relative;
  flex-basis: 45%;
  margin: 1rem;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  transition: color 0.5s ease, border-color 0.25s ease, transform 0.75s ease;

  &:hover {
    color: #f3c600;
    border-color: #f3c600;
    transform: scale(1.025);
  }

  h3 {
    text-align: left;
    font-size: 1rem;
  }
  p {
    display: flex;
    text-align: justify;
    margin: 1rem 0 0;
    font-size: 1rem;
    line-height: 1.5;
  }
  span {
    font-size: 1.5rem;
  }
  img {
    height: 20vw;
    @media (max-width: 600px) {
      height: 50vw;
    }
  }
  button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`

const ProductCard = (product, addToCart) => (
  <Card key={product.title}>
    <img src={`/${product.slug}.jpg`} alt={product.title}/>
    <div>
      <Link href={`/products/${product.slug}`}><a><h3>{product.title}</h3></a></Link>
      <p>$<span>{product.price}</span></p>
      <button onClick={() => addToCart(product.id)}>Add to cart</button>
    </div>
  </Card>
)

export default function Home(props) {
  const { products } = props
  const { cart, addToCart } = useCart()


  return (
    <>
      <Head>
        <title>NexStore</title>
      </Head>

      <Main>
        
        <Grid>
          {products.map((product) => ProductCard(product, addToCart))}
        </Grid>

      </Main>
    </>
  )
}

export const getStaticProps = async () => {
  //buka /contents directory
  const contentsDir = `${process.cwd()}/contents`
  //baca nama file
  const filenames = fs.readdirSync(contentsDir)

  const products = filenames.map(filename => {
    //baca-lihat konten tiap file
    const fileContent = fs.readFileSync(`${contentsDir}/${filename}`).toString()
    //ambil frontmatter(metadata) tiap file
    const { data } = matter(fileContent)
    //return "title", "price", "description", "slug"
    const slug = filename.replace('.md', '')

    return { 
      ...data, 
      slug 
    }
  })

  return {
    props: {
      products
    }
  }
}
