import { defineStore } from 'pinia';
import useAPI from '~/composables/useApi';

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
    const getCateProdList = async (cate?: string) =>  {
        const url: string = cate ? `/api/products/categories/${cate}?limit=4` : '/api/products/categories'
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