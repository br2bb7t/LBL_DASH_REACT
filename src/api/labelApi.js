import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const printLabel = (lpn) =>
    api.post('/labels/print', {
        request: { lpn },
    });

export const getHistory = () =>
    api.get('/labels/history');