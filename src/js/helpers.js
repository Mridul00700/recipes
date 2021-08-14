import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};


export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        }) : fetch(url);
        console.log(fetchPro);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`${data.message} (${res.status})`)
        }
        return data;
    } catch (err) {
        throw err;
    }
}

// export const getJSON = async function (url) {

//     try {

//         // const res = await fetch(url);

//         // 
//         // json method is availiable on all the response objects..

//         return await AJAX(url);

//     } catch (err) {
//         throw err;
//     }
// }


// export const sendJSON = async function (url, uploadData) {
//     try {
//         return await AJAX(url, uploadData);
//     } catch (err) {
//         throw err;
//     }
// }