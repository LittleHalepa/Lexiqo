
interface User {
    id: number;
    username: string;
    email: string;
    public_id: string;
    profile_picture: string;
}

type UserData =
    | { error: false; message: string; user: User }
    | { error: true; message: string, errors?: string[] };

export function comparePasswords(password: string, confirmPassword: string): boolean {

    return password === confirmPassword;

}

export async function registerUser(username: string, email: string, password: string, recaptchaToken: string): Promise<UserData> {

    if (!username || !email || !password) {
        throw new Error("Username or email or password missing!");
    }

    try {

        const bodyContent = {
            username,
            email,
            password,
            recaptchaToken
        }

        const response = await fetch(`http://localhost:3000/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(bodyContent),
        });

        const data = await response.json();
        return data;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Register error:", message);
        return {
            error: true,
            message: "Failed to register user"
        }
    }
    
}

export async function loginUser(email: string, password: string, recaptchaToken: string): Promise<UserData> {
    if (!email || !password) {
        throw new Error("Email or password missing!");
    }

    try {

        const bodyContent = {
            email,
            password,
            recaptchaToken
        }

        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(bodyContent),
        });

        const data = await response.json();
        return data;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Login error:", message);
        return {
            error: true,
            message: "Failed to login user"
        }
    }
}