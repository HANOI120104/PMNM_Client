const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

async function fetchApi(url: string, method: string = 'GET', body: any = null, auth: boolean = false) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (auth) {
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
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
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch API error:', error);
        throw error;
    }
}

export default fetchApi;
