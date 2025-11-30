
interface ApiResponse {
  error?: boolean;
  message?: string;
  [key: string]: any;
}

export const sendRequest = async (url: string, method: string, body?: any, isRetry = false): Promise<ApiResponse> => {

    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        if ((response.status === 401 || response.status === 403)) {

            if (isRetry) {
                window.location.href = "/login";
                return {
                    error: true,
                    message: "Session expired. Please log in again."
                };
            }

            const refreshResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!refreshResponse.ok) {
                window.location.href = "/login";
                return { error: true, message: "Session expired. Please log in again." };
            }

            return await sendRequest(url, method, body, true);
        }

        const data: ApiResponse = await response.json();
        return data;

    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
            console.error(`Error during ${method} request to ${url}:`, message);
        return {
            error: true,
            message: `Failed to ${method} data`
        };
    }

}