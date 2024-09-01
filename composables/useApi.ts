import { FetchError } from "ofetch";
export default function useAPI() {
  const fetchData: Ref<any> = ref();
  const isLoading: Ref<boolean> = ref(false);

  const callAPI = async (url: string) => {
    isLoading.value = true;
    
    try {
      const response = await $fetch(url, { responseType: 'json' });
      fetchData.value = response;

    } catch (error) {
      const FetchError = error as FetchError;
      if (FetchError.response && FetchError.response.status === 404) {
        throw showError({ statusCode: 404, statusMessage: 'API Not Found' })
      } else if (FetchError.response && FetchError.response.status <= 500) {
        throw showError({ statusCode: FetchError.response?.status, statusMessage: FetchError.message })
      }
      
    } finally {
      isLoading.value = false;
    }
  }

  return { 
    fetchData,
    isLoading,
    callAPI
  };
}
