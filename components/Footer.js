import styled from 'styled-components'

const Foot = styled.footer`
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

const Footer = () => {
    return (
        <Foot>
          <p>Made with &hearts; by <a href="https://github.com/DSPdav/">DSPdav</a></p>
        </Foot>
    )
}

export default Footer