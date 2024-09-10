import type { ProductDetailModel } from "~/models/apiModel";
import type { cartProductModel } from "~/models/viewModel";

export const productToCartFormatter = (pModel: ProductDetailModel, quantity: number): cartProductModel => {
    // console.log(pModel);
    
    const result: cartProductModel = {...pModel, quantity };
    // console.log(result);
    
    return result;
}