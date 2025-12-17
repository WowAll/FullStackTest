import useAuthStore from '@/stores/useAuthStore';

const API_URL =
    typeof window === 'undefined'
        ? process.env.NEXT_INTERNAL_API_URL
        : process.env.NEXT_PUBLIC_API_URL;

function getAuthHeaders() {
    const headers = { 'Content-Type': 'application/json' };

    if (typeof window !== 'undefined') {
        const token = useAuthStore.getState().token;
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
}

export const api = {
    async get(endpoint) {
        const res = await fetch(`${API_URL}${endpoint}`, {
            headers: getAuthHeaders(),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `API Error: ${res.status}`);
        }
        const json = await res.json();
        return json.data ?? json;
    },

    async post(endpoint, data) {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `API Error: ${res.status}`);
        }
        const json = await res.json();
        return json.data ?? json;
    },

    async patch(endpoint, data) {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `API Error: ${res.status}`);
        }
        const json = await res.json();
        return json.data ?? json;
    },

    async delete(endpoint) {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `API Error: ${res.status}`);
        }
        const json = await res.json();
        return json.data ?? json;
    },
};
