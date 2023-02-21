import {createAuthProvider} from 'react-token-auth'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const now = new Date();
const expires = new Date(now.getTime()+ 1 * 3600 * 1000);
const authProvider = createAuthProvider({
    accessTokenKey: 'access_token',
    
    onUpdateToken: (token) => fetch('/auth/refresh', {
        method: 'POST',
        body: token.refresh_token
    })
    .then(r => r.json()),
    storage: {
        getItem: (key) => cookies.get(key),
        setItem: (key, value) => cookies.set(key, JSON.stringify(value),  {expires} ),
        removeItem: (key) => cookies.remove(key),
      },
});

export const useAuth = authProvider.useAuth;
export const authFetch = authProvider.authFetch;
export const login = authProvider.login;
export const logout = authProvider.logout;
