import { defineStore } from 'pinia';
import useAPI from '~/composables/useApi';

const storeName = 'category';
export const useCategory = defineStore(storeName, () => {
    const { 
        callAPI, 
        fetchData: categoryList,
        isLoading: categoryIsLoading
    } = useAPI();

    const categoryCallApi = async () =>  {
        return callAPI(`/api/products/categories`);
    }
    return {
        categoryCallApi,
        categoryList,
        categoryIsLoading
    }
});