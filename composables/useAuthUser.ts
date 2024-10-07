import { onAuthStateChanged, type Auth, type User } from 'firebase/auth';



export const useAuthUser = async () => {
    const { $auth } = useNuxtApp();
    const user: Ref<User | null> = ref(null);
    console.log('useAuthUser');
    await onAuthStateChanged($auth as Auth, (currentUser) => {
        console.log('useAuthUser:currentUser');
        console.log(currentUser);
        
        if (currentUser) {
            user.value = currentUser;
        } else {
            user.value = null;
        }
    });
    return user;
};
