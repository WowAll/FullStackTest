import useAuthStore from '@/stores/useAuthStore';

const API_URL =
    typeof window === 'undefined'
        ? process.env.NEXT_INTERNAL_API_URL
        : process.env.NEXT_PUBLIC_API_URL;

export const api = {
    async get(endpoint) {
        const res = await fetch(`${API_URL}${endpoint}`, {
            credentials: 'include',
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `API Error: ${res.status}`);
        }
        const json = await res.json();
        return json.data ?? json;
    },

    async post(endpoint, data) {
        console.log(`API POST: ${endpoint}`, { credentials: 'include' });
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
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
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
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
            credentials: 'include',
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `API Error: ${res.status}`);
        }
        const json = await res.json();
        return json.data ?? json;
    },
};
