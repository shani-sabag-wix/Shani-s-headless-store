
import { createClient, OAuthStrategy } from '@wix/api-client';
import { products } from '@wix/stores';
import './page.css';
import { ProductOption } from '@/src/components/ProductOption/ProductOption';
import { AddToCart } from '@/src/components/AddToCart/AddToCart';

const wixClient = createClient({ modules: { products } , auth: OAuthStrategy({ clientId: '174345f4-570c-4212-93a7-06e8f9d04c8f' }) });

async function queryProduct(slug: string) {
  const { items } = await wixClient.products.queryProducts().eq('slug', slug).find();
  return items[0]
}

export default async function Product({ params }: { params: { slug: string } }) {
    const product = await queryProduct(params.slug)
    const {price, discountedPrice} = product.priceData?.formatted ?? {};
    const ribbon = product.ribbon;
    return <div>
        <div>
            {product.name}
        </div>
        <div className='image-wrapper'>
            <img src={product.media?.mainMedia?.image?.url} alt="" width={300} height={300}/>
            {ribbon && <div className='ribbon'>{ribbon}</div>}
        </div>
        <div>{discountedPrice} {price !== discountedPrice ? <s>{price}</s> : ''}</div>
        <div dangerouslySetInnerHTML={{__html: product.description || ''}}></div>
        {product.productOptions?.map(productOption => 
            <ProductOption  productOption={productOption}  />
        )}
        <AddToCart quantity={1} options={{}} catalogItemId={product._id!} />
    </div>

}