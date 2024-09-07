import { defineStore } from 'pinia';
import useAPI from '~/composables/useApi';
import type { ProductListModel } from '~/models/apiModel';

const storeName = 'category';
export const useCategory = defineStore(storeName, () => {
    const { 
        callAPI, 
        fetchData: categoryList,
        isLoading: categoryIsLoading
    } = useAPI();

    const { 
        callAPI: callCateName, 
        fetchData: cateNameList,
        isLoading: cateNameIsLoading
    } = useAPI();

    const getCateNameList = async (cate?: string) =>  {
        return await callCateName('https://dummyjson.com/products/category-list');
    }

    // https://dummyjson.com/products/category/smartphones
    const getCateProdList = async (limit=4, skip=0, cate?: string) =>  {
        // https://dummyjson.com/products/category/smartphones?limit=4
        const url: string = cate ? `https://dummyjson.com/products/category/${cate}?limit=${limit}&skip=${skip}` : 'https://dummyjson.com/products/categories'
        console.log(`url`, url);
        return callAPI(url);
    }
    
    return {
        getCateProdList,
        getCateNameList,
        cateNameList,
        cateNameIsLoading,
        categoryList,
        categoryIsLoading,
    }
});

// 'https://dummyjson.com/products?limit=10&skip=10&select=title,price'