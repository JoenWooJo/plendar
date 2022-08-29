import axios from 'axios';

const client = axios.create({ baseURL: '/api' })

/**
 * axios GET(Read) 요청
 * @param {string} url api 서버 url [도메인 제외]
 * @returns 
 */
export const get = async (url) => {
    try {
        let response = await client.get(url);
        return response.data.data;
    } catch (error) {
        console.error("Error >>", error);
    }
}

/**
 * axios POST(Create) 요청
 * @param {string} url api 서버 url [도메인 제외]
 * @param {object} data 추가할 채널 or 크루 객체
 * @returns 
 */
export const post = async (url, data) => {
    try {
        let response = await client.post(url, data);
        return response.data;
    } catch (error) {
        console.error("Error >>", error);
    }
}

export const postJson = async (url, data) => {
    console.log(url, data);
    try {
        let response = await client.post(url, data, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("Error >>", error);
    }
}

export const putJson = async (url, data) => {
    try {
        let response = await client.put(url, data, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("Error >>", error);
    }
}

export const put = async (url, data) => {
    try {
        let response = await client.put(url, data);
        return response.data;

    } catch (error) {
        console.error("Error >>", error);
    }
}

export const remove = async (url, data) => {
    try {
        let response = await client.delete(url, data);
        return response.data;

    } catch (error) {
        console.error("Error >>", error);
    }
}