"use client"

import {createContext, useContext, FC, ReactNode, useEffect, useState} from 'react'
import { createClient, OAuthStrategy } from '@wix/api-client';
import { cart } from '@wix/ecom';
import { Cart, LineItem } from '@wix/ecom/build/cjs/src/ecom-v1-cart-cart.universal';
const wixClient = createClient({ modules: { cart } , auth: OAuthStrategy({ clientId: '174345f4-570c-4212-93a7-06e8f9d04c8f' }) });

const CartContext = createContext('');

// export const CartProvider: FC<{children: ReactNode}> = ({children}) => {
//     const [cart, setCart] = useState<Cart | null>(null);
//     useEffect(() => {
//         wixClient.cart.createCart().then(cart => {
//             setCart(cart)
//         })
//     }, [])

//     return cart ? <CartContext.Provider value={cart._id!}>{children}</CartContext.Provider> : <></>
// }

export const useCart = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const addItemToCart = (lineItem: LineItem) => {
        if (cart) {
            wixClient.cart.addToCart(cart._id!, {lineItems: [lineItem]})
        } else {
            const newCart = wixClient.cart.createCart({lineItems: [lineItem]})
                .then(newCart => {

                    setCart(newCart)
                })
        }
    }
    return {addItemToCart};
}