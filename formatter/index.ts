import type { ProductDetailModel } from "~/models/apiModel";
import type { cartProductModel } from "~/models/viewModel";

export const productToCartFormatter = (pModel: ProductDetailModel, quantity: number): cartProductModel => {
    const result: cartProductModel = {...pModel, quantity };
    return result;
}