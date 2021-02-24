import Link from 'next/link'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    color: #414141;
    user-select: none;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  * {
    box-sizing: border-box;
  }
`
const Nav = styled.nav`
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
  }
  a {
    transition: color 0.5s ease;  
  }
  a:hover {
    color: #717171;
  }
`
const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 92.5%;
  height: 75px;
  border-top: 1px solid #eaeaea;

  a:hover, a:focus, a:active {
    color: #717171;
  }
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle/>
      <Nav>
        <div id="wrapper">
          <Link href="/"><a id="logo">NexStore</a></Link>
          <div>
            <Link href="/about"><a>About</a></Link>
          </div>
        </div>
      </Nav>
      <Component {...pageProps} />
      <Footer>
        <p>Made with &hearts; by <a href="https://github.com/DSPdav/">DSPdav</a></p>
      </Footer>
    </>
  )
}

export default MyApp
