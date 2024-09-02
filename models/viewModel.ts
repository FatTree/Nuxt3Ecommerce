import type { ProductDetailModel } from "./apiModel";

export type RegistrationModel = {
    email: string;
    password: string;
    confirmPassword: string;
}

export type LoginModel =  {
    email: string;
    password: string;
}

export type userModel = {
    UID: string;
    name: string;
    phone: string;
    address: string;
    email: string;
}

export type purchaseOrder = {
    userUID: string;
    purchaseID: string;
    purchaseDate: string;
}

export type item = {
    purchaseID: string;
    productId: string;
}

export type purchaseOrderItem = {
    purchaseID: string;
    purchaseItems: Array<item>;
}

export type landingPageProdGroupModel = {
    categoryName: string;
    productList: Array<ProductDetailModel>;
}