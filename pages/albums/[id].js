import Heading from "../../components/Heading"
import Layout from "../../components/Layout"

import { getAllAlbumSlugs, getSingleAlbumData } from "../../lib/api"

// WATERFALL
// 1. getStaticPaths
export async function getStaticPaths() {
    const paths = getAllAlbumSlugs();
    return {
        paths,
        fallback: false
    }
}
// 2. getStaticProps
export async function getStaticProps({ params }) {
    console.log({ params });
    const albumData = getSingleAlbumData(params.id);
    return {
        props: {
            albumData
        }
    }
}

// 3. use the data
const SingleAlbumPage = ({ albumData }) => {
    const { title } = albumData.matchingAlbum;
    return <Layout>
        <Heading level="1">{title}</Heading>
    </Layout>
}
export default SingleAlbumPage;