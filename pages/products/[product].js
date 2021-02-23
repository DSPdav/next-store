import fs from 'fs'
import matter from 'gray-matter'
import marked from 'marked'
import Head from 'next/head'

const Product = ({product: {data, content}}) => {

    return (
        <>
            <Head>
                <title>{`Next Store App | ${data.title}`}</title>
            </Head>

            <img src={`/${data.productName}.jpg`} alt={data.title}/>
            <h2>{data.title}</h2>
            <p>${data.price}</p>

            <div dangerouslySetInnerHTML={{__html: marked(content)}}/>
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
