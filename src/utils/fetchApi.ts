/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000";
import Cookies from "js-cookie";

async function fetchApi(url: string, method: string = 'GET', body: any = null, auth: boolean = false) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (auth) {
        const getCookie = Cookies.get("access_token");
        if (getCookie) {
            headers['Authorization'] = `Bearer ${getCookie}`;
        } else {
            console.warn('No token found in localStorage');
        }
    }

    const options: RequestInit = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, options);

        if (!response.ok) {
            const errorBody = await response.json();  // Parse lỗi từ body nếu có
            throw errorBody.message || errorBody.error
            // const errorMessage = errorBody?.message || response.statusText || 'An error occurred';
            // throw new Error(`Error: ${response.status} - ${errorMessage}`);
            // throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch API error:', error);
        throw error;
    }
}

export default fetchApi;
