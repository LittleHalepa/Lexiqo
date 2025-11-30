import { useEffect } from "react";

interface GoogleCredentialResponse {
  credential: string; // JWT (id_token)
  clientId: string;
  select_by: string;
}

export default function GoogleButton() {

    useEffect(() => {
        window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // твій client id
        callback: handleCredentialResponse
        });

        window.google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large" }
        );
    }, []);

    function handleCredentialResponse(response: GoogleCredentialResponse) {
        fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential })
        })
        .then(res => res.json())
        .then(data => console.log("Google login:", data));
    }

    return (
        <button id="googleBtn" className="w-full bg-white text-black py-3 px-4 rounded-lg mt-5 flex items-center justify-center border-[rgba(51,51,51,20%)] border transition-colors text-sm font-medium hover:bg-gray-100 cursor-pointer active:bg-gray-100">
            <i className='bx bxl-google text-xl mr-2'></i> Continue with Google
        </button>
    );
}