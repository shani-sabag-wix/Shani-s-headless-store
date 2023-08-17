

import React from 'react'
import { OptionType, ProductOption as ProductOptionType } from '@wix/stores/build/cjs/src/stores-catalog-v1-product.universal';
import './ProductOption.css';


interface ProductOptionProps {
    productOption: ProductOptionType
}

export const ProductOption: React.FC<ProductOptionProps> = ({ productOption }) => {
    const {optionType, choices, name} =  productOption;
    let OptionsComponent
    if (optionType === OptionType.drop_down) {
        OptionsComponent = <select name={name} id={name}>
            {choices?.map(choice => <option value={choice.value}>{choice.value}</option>)}
        </select>
    } else if (optionType === OptionType.color) {
        OptionsComponent = <fieldset>      
        {choices?.map(choice => <div className="color-wrapper">
          <input type="radio" id={choice.value} name={name} value={choice.value} checked />
          <label htmlFor={choice.value}><div style={{backgroundColor: choice.value}} className="color-choice"></div></label>
        </div>)}
      </fieldset>
    }
    return <div>
        <div>{name}</div>
        {OptionsComponent}
    </div>
}