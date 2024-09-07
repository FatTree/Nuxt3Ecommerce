import { defineStore } from 'pinia';
import useAPI from '~/composables/useApi';

const storeName = 'product';
export const useProduct = defineStore(storeName, () => {
    const { 
        callAPI, 
        fetchData: someProductList,
        isLoading: isSomeProductLoading
    } = useAPI();

    const {
        callAPI: getFiltered,
        fetchData: filteredProductList,
        isLoading: isfilteredProductLoading
    } = useAPI();

    const { 
        callAPI: getAllProds, 
        fetchData: allProductsList,
        isLoading: isAllProductLoading
    } = useAPI();

    const { 
        callAPI: getProd, 
        fetchData: productDetail,
        isLoading: isProductLoading
    } = useAPI();

    const getSomeProductList = async (limit=4, skip=0, cate: string) =>  {
        return await callAPI(`https://dummyjson.com/products/category/${cate}?limit=${limit}&skip=${skip}`);
    }

    const getFilteredProductList = async () => {
        return await getFiltered('https://dummyjson.com/products/search?q=phone&limit=2&skip=2')
    }

    const getAllCateProductList = async (cate: string) =>  {
        return await getAllProds(`https://dummyjson.com/products/category/${cate}`);
    }

    const getProductDetail = async(id: number | string) => {
        // 'https://dummyjson.com/products/1'
        return await getProd(`https://dummyjson.com/products/${id}`);
    }

    return {
        getSomeProductList,
        someProductList,
        isSomeProductLoading,
        getAllCateProductList,
        allProductsList,
        isAllProductLoading,
        getFilteredProductList,
        filteredProductList,
        isfilteredProductLoading,
        getProductDetail,
        productDetail,
        isProductLoading,
    }
});