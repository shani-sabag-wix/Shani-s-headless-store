"use client"
import { useCart } from '@/src/context/cartContext';
import { FC } from 'react';

export const AddToCart: FC<{catalogItemId: string, options: Record<string, any>, quantity: number}> = ({ quantity, catalogItemId, options}) => {
    const {addItemToCart} = useCart()

 return         <button onClick={() => {
    addItemToCart({
        catalogReference: {
            appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
            catalogItemId,
            options
        },
        quantity
    })
}} className='inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700'>Add To Cart</button>

}