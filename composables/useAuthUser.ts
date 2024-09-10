import { onAuthStateChanged, type Auth, type User } from 'firebase/auth';

export const useAuthUser = () => {
    const { $auth } = useNuxtApp();
    const user: Ref<User | null> = ref(null);

    onMounted(() => {
        onAuthStateChanged($auth as Auth, (currentUser) => {
            if (currentUser) {
                user.value = currentUser;
            } else {
                user.value = null;
            }
        });
    });

    return user;
};
