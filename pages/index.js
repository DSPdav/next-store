import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
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
          a Store made with{' '}
          <code className={styles.code}>Next.js</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Products</h3>
            <p>all products you can find in this store.</p>
          </div>
          <div className={styles.card}>
            <h3>Features</h3>
            <p>find, see, and let you purchase easily.</p>
          </div>
          <div className={styles.card}>
            <h3>About</h3>
            <p>make everything accessible with us.</p>
          </div>
          <div className={styles.card}>
            <h3>Contact</h3>
            <p>say hi to us for more details.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
