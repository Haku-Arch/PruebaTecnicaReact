import Head from 'next/head'
import Link from 'next/link'
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Prueba Técnica Verónica Bitar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome!
        </h1>

        <nav>
          <Button color="primary">
              <Link href='/products'>
                <h3>
                  <a>
                    Products Form here
                  </a>
                </h3>
              </Link>
          </Button>
        </nav>

      </main>
    </div>
  )
}
