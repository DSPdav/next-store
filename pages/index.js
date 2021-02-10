import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fs from 'fs'
import matter from 'gray-matter'

export default function Home(props) {
  const { products } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>Next Store App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next Store App!</a>
        </h1>

        <p className={styles.description}>
          a Store where everything you need to buy.
        </p>

        <div className={styles.grid}>
          {products.map(product => (
            <div className={styles.card} key={product.title}>
              <img src={`/${product.slug}.jpg`} alt={product.title}/>
              <div>
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Made with &hearts; by DSPdav</p>
      </footer>
    </div>
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
