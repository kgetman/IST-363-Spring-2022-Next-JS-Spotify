import Col from "../../components/Col"
import Heading from "../../components/Heading"
import Image from 'next/image'
import Layout from "../../components/Layout"
import Row from "../../components/Row"


import { getAllArtistSlugs, getSingleArtistData } from '../../lib/api'

//WATERFALL
// 1. getStaticPaths
export async function getStaticPaths() {
    const paths = await getAllArtistSlugs();
    return {
        paths,
        fallback: false
    }
}
// 2. getStaticProps
export async function getStaticProps({ params }) {
    //console.log({params});
    const artistData = await getSingleArtistData(params.id);
    //console.log({artistData});
    return {
        props: {
            artistData
        }
    }
}

// 3. use the data
const SingleArtistPage = ({ artistData }) => {
    const { title, featuredImage, artistInformation } = artistData;
    const { sourceUrl, altText, mediaDetails } = featuredImage.node;
    return <Layout>
        <Image 
            src={sourceUrl}
            alt={altText}
            width={mediaDetails.width}
            height={mediaDetails.height}
        />
        <Heading level="1">{title}</Heading>
        <section>
        <Heading level="2">Albums</Heading>
        </section>
    </Layout>
}
export default SingleArtistPage;
/* const SingleArtistPage = ({ artistData }) => {
    console.log({artistData});
    const { title, featuredImage, artistInformation } = artistData;
    const { sourceURL, altText, mediaDetails } = featuredImage.node;
    const { artistsToAlbums } = artistInformation;
    return <Layout>
        <Image 
            src={sourceURL}
            alt={altText}
            width={mediaDetails.width}
            height={mediaDetails.height}
        />
        <Heading level="1">{title}</Heading>
        <section>
            <Heading level="2">Albums</Heading>
            <Row>
            {artistsToAlbums.map((album) => {
                const { title, featuredImage } = album;
                const { sourceURL, altText, mediaDetails } = featuredImage.node;
                return <Col xs="6" sm="4" md="3">
                    <Image 
                        src={sourceURL}
                        alt={altText}
                        width={mediaDetails.width}
                        height={mediaDetails.height}
                    />
                    <Heading level="3"></Heading>
                </Col>
            })}
            </Row>
        </section>
    </Layout>
}
export default SingleArtistPage; */
