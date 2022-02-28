import { token } from '../store/states/auth/auth';

const API_BASE = import.meta.env.VITE_APP_API_ROOT

export const request = (url: string, method: string, payload?: any, headers?: any) => {


    headers = headers || {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    url = API_BASE + url;

    return fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json', ...headers
        },
        body: JSON.stringify(payload)
    })
}

export const requestAuth = (url: string, method: string, payload?: any, headers?: any) => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic c2hlYmEtaHItd2ViLXJlYWQtd3JpdGUtY2xpZW50OnNoZWJhLWhyLXdlYi1yZWFkLXdyaXRlLWNsaWVudDE0MzI=");
    let formdata = new FormData();
    formdata.append("grant_type", "password");
    formdata.append("username", payload?.username);
    formdata.append("password", payload?.password);

    url = API_BASE + url;

    return fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: myHeaders,
        body: formdata
    })
}

export const removeTokenFunction = (url: string, method: string, payload?: any, headers?: any) => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${payload}`);
    url = API_BASE + url;

    return fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: myHeaders,

    })
}


export const requestFileUpload = (url: string, method: string, payload?: any, headers?: any) => {

    headers = headers || {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    url = API_BASE + url;

    return fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            ...headers
        },
        body: payload
    })
}


export const postAuth = (url: string, payload: any) => {
    return requestAuth(url, 'POST', payload);
}
export const removeToken = (url: string, payload: any) => {
    return removeTokenFunction(url, 'GET', payload);
}

export const post = (url: string, payload?: any) => {
    return request(url, 'POST', payload);
}

export const get = (url: string) => {
    return request(url, 'GET');
}

export const postFile = (url: string, payload: any) => {
    return requestFileUpload(url, 'POST', payload);
}
export const del = (url: string) => {
    return request(url, 'DELETE');
}

export const delBulk = (url: string, payload: any) => {
    return request(url, 'DELETE', payload);
}

export const patch = (url: string, payload: any) => {
    return request(url, 'PATCH', payload);
}

export const deleteItem = (url: string) => {
    return request(url, 'DELETE');
}

export const update = (url: string, paylad: any) => {
    return request(url, 'PATCH', paylad);
}

export const put = (url: string, payload?: any) => {
    return request(url, 'PUT', payload);
}
