
import { createClient, OAuthStrategy } from '@wix/api-client';
import { products } from '@wix/stores';
import './page.css';
const wixClient = createClient({ modules: { products } , auth: OAuthStrategy({ clientId: '174345f4-570c-4212-93a7-06e8f9d04c8f' }) });

async function queryProducts() {
  const { items } = await wixClient.products.queryProducts().find();
  return items
}

export default async function Products() {
    const products = await queryProducts()
    return (<ul className='products-wrapper'>
        {products.map((product) => {
            const {price, discountedPrice} = product.priceData?.formatted ?? {};
            const ribbon = product.ribbon;
            return <li className='product' key={product._id}>
                <div>
                    {product.name}
                </div>
                <div className='image-wrapper'>
                    <img src={product.media?.mainMedia?.image?.url} alt="" width={300} height={300}/>
                    {ribbon && <div className='ribbon'>{ribbon}</div>}
                </div>
                <div>{discountedPrice} {price !== discountedPrice ? <s>{price}</s> : ''}</div>
                <a href={`/products/${product.slug}`} className='inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700'>See Product</a>
            </li>
        })}
    </ul>)
    
}