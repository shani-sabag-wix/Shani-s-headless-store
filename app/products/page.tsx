
import { createClient, OAuthStrategy } from '@wix/api-client';
import { products } from '@wix/stores';

const wixClient = createClient({ modules: { products } , auth: OAuthStrategy({ clientId: '7e1e2bba-70f0-48f8-9d65-399b6952abb3' }) });

async function queryProducts() {
  const { items } = await wixClient.products.queryProducts().find();
  return items
}

export default async function Products() {
    const products = await queryProducts()
    return (<ul>
        {products.map((product) => {
            return <li key={product._id}>name: {product.name} id: {product._id}</li>
        })}
    </ul>)
    
}