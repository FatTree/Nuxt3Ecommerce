export type Product_ReviewModel = {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
}
export type Product_MetaModel = {
    createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string
}
export type ProductDetailModel = {
    id: string,
    title: string,
    description: string,
    category: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    tags: Array<string>,
    brand: string,
    sku: string,
    weight: number,
    dimensions: {
        width: number,
        height: number,
        depth: number
    },
    warrantyInformation: string,
    shippingInformation: string,
    availabilityStatus: string,
    reviews: Array<Product_ReviewModel>,
    returnPolicy: string,
    minimumOrderQuantity: number,
    meta: Product_MetaModel,
    thumbnail: string,
    images: Array<string>
}

export type ProductListModel = {
    products: Array<ProductDetailModel>,
    total: number,
    skip: number,
    limit: number
}

export type CategoryItemModel = {
    slug: string,
    name: string,
    url: string
}

export type CategoryNameListModel = Array<string>;

