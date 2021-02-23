import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  padding: 0 .5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  margin-top: 3rem;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`

const Card = styled.div`
  flex-basis: 45%;
  margin: 1rem;
  padding: 1.5rem;
  text-align: center;
  color: inherit;
  text-decoration: none;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  transition: color 0.5s ease, border-color 0.25s ease;

  &:hover {
    color: #f3c600;
    border-color: #f3c600;
  }

  h3 {
    text-align: left;
    font-size: 1.25rem;
  }
  p {
    text-align: left;
    margin: 1rem 0 0;
    font-size: 1rem;
    line-height: 1.5;
  }
  img {
    height: 250px;
  }
`

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 95%;
  height: 100px;
  border-top: 1px solid #eaeaea;

  a:hover, a:focus, a:active {
    color: #717171;
  }
`

export default function Home(props) {
  const { products } = props

  return (
    <Container>
      <Head>
        <title>Next Store App</title>
      </Head>

      <Main>
        <h1>
          Welcome to <a href="#">Next Store App!</a>
        </h1>

        <p>
          a Store where everything you need to buy.
        </p>

        <Grid>
          {products.map(product => (
            <Card key={product.title}>
              <img src={`/${product.slug}.jpg`} alt={product.title}/>
              <div>
                <Link href={`/products/${product.slug}`}><a><h3>{product.title}</h3></a></Link>
                <p>${product.price}</p>
                <p>{product.description}</p>
              </div>
            </Card>
          ))}
        </Grid>
      </Main>

      <Footer>
        <p>Made with &hearts; by <a href="https://github.com/DSPdav/">DSPdav</a></p>
      </Footer>
    </Container>
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
