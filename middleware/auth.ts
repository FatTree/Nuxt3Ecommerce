export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await useAuthUser();
    console.log(user.value);
    
    if (!user.value) {
        return navigateTo('/login');
    }
})


// export default defineNuxtRouteMiddleware(async (to, from) => {
//     const { $auth } = useNuxtApp();
//     return new Promise((resolve) => {
//         onAuthStateChanged($auth as Auth, (user) => {
//             if (!user) {
//                 return resolve(navigateTo('/login'));
//             }
//             resolve(); // 允許進入頁面
//         });
//     });
// });