import { ref, computed } from 'vue';

const utilisateur = ref(null);
const isLoggedIn = computed(() => !!utilisateur.value);

function init() {
    const userData = localStorage.getItem('user');
    if (userData) {
        utilisateur.value = JSON.parse(userData);
    }
}

init();

export const authService = {
    utilisateur,
    isLoggedIn,

    login(user) {
        utilisateur.value = user;
        localStorage.setItem('user', JSON.stringify(user));
    },

    logout() {
        utilisateur.value = null;
        localStorage.removeItem('user');
    },

    getUser() {
        return utilisateur.value;
    },

    checkAuth() {
        return isLoggedIn.value;
    }
};