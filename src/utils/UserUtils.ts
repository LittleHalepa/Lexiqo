import { sendRequest } from './ApiUtils';

export async function getUserInformation() {
    const refreshResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include'
    });

    if (!refreshResponse.ok) {
        const errorData = await refreshResponse.json();
        console.log(errorData.message);
        return { error: true, message: "No active session" };
    }

    const data = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        'GET',
        undefined,
        true 
    );

    if (data.error) {
        return { error: true, message: data.message };
    }

    return { error: false, user: data.user };
}