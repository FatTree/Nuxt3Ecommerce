import { defineStore } from 'pinia';
import useAPI from '~/composables/useApi';

const storeName = 'test';
export const useTest = defineStore(storeName, () => {
    const { 
        callAPI, 
        fetchData,
        isLoading
    } = useAPI();

    const testCallApi = async () =>  {
        return callAPI(`/api/products`);
    }
    return {
        testCallApi,
        isLoading,
        fetchData
    }
});