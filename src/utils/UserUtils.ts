
export async function getUserInformation() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
        credentials: 'include',
    });
    const data = await response.json();

    if (!response.ok) {
        return {
            error: true,
            message: data.message
        }
    }

    return {
        error: false,
        user: data.user
    };
}