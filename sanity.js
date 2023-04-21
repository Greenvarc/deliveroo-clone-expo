import sanityClient from '@sanity/client'
import imageUrlbuilder from '@sanity/image-url'

const client=sanityClient({
    projectId:'ajzmel73',
    dataset:'production',
    useCdn:true,
    apiVersion:'2021-10-21',
})

const builder=imageUrlbuilder(client)
export const urlFor=(source)=>builder.image(source);
export default client;