export default defineNuxtPlugin(nuxtApp => {
    const router = useRouter();

    nuxtApp.hook('vue:error', (error, instance, info) => {
        console.error('error:', error);
        console.error('instance:', instance);
        console.error('info:', info);

        throw showError({ statusMessage: 'Sorry, some internal issues occured, please give us some time to fix it' })
    });
});
