import fs from 'fs'
import matter from 'gray-matter'
import marked from 'marked'
import Head from 'next/head'
import styled from 'styled-components'

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 1000px;
    margin: 3rem auto;
    padding: 0 1rem;

    img {
        align-self: center;
        height: 25vw;
        @media (max-width: 600px) {
            height: 50vw;
        }
    }
    p {
        text-align: justify;
    }
`

const Product = ({product: {data, content}}) => {

    return (
        <>
            <Head>
                <title>{`NexStore | ${data.title}`}</title>
            </Head>

            <Main>
                <img src={`/${data.productName}.jpg`} alt={data.title}/>
                <h2>{data.title}</h2>
                <p>${data.price}</p>
                <p>{data.description}</p>

                <div dangerouslySetInnerHTML={{__html: marked(content)}}/>
            </Main>
        </>
    )
}

export const getStaticPaths = async () => {
    const contentDir = `${process.cwd()}/contents`
    const filenames = fs.readdirSync(contentDir)

    return {
        paths: filenames.map(file => ({
            params: {
                product: file.replace('.md', '')
            }
        })),
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const productName = context.params.product
    const filepath = `${process.cwd()}/contents/${productName}.md`
    const fileContent = fs.readFileSync(filepath).toString()
    const { data, content } = matter(fileContent)

    return {
        props: {
            product: {
                data: {productName, ...data},
                content
            }
        }
    }
}

export default Product
