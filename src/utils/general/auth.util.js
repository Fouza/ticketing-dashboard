import cookie from 'js-cookie'
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { dispatchAction } from '../general/dispatch.util';


// Set in Cookie
export const setCookie = (key, value,expire) => {
    if (window !== undefined) {
        cookie.set(key, value, {
            // 1 Day
            expires: expire
        })
    }
}
// remove from cookie
export const removeCookie = key => {
    if (window !== undefined) {
        cookie.remove(key, {
            expires: 1
        });
    }
};


// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = key => {
    if (window !== undefined) {
        return cookie.get(key);
    }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Remove from localstorage
export const removeLocalStorage = key => {
    if (window !== undefined) {
        localStorage.removeItem(key);
    }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (token,user) => {
    //console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('tokenCookie', token);
    setLocalStorage('user', user);
	setLocalStorage('email',user.email);
	localStorage.setItem('isLogged', true)
    //next();
};

// Access user info from localstorage
export const isAuthenticated = (ky) => {
    if (window !== undefined) {
        const cookieChecked = getCookie("tokenCookie");
        if (cookieChecked) {
			return true
        }else{
			return false
		}
    }
};
export const isAuth = () => {
    if (window !== undefined) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

export const signout = () => {
    removeCookie('tokenCookie');
    removeLocalStorage('user');
	removeLocalStorage('email');
	removeLocalStorage('isLogged');
    //next();
};

export const updateUser = (data, next) => {
    // console.log('UPDATE USER IN LOCALSTORAGE HELPERS', data);
    if (typeof window !== undefined) {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = data.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};