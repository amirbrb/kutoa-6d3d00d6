import { useState, useEffect } from "react";

export default function useUser() {
    const [user, setUser] = useState<{email: string, name?: string}>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    return {user, logout: () => {
        localStorage.removeItem('user');
        setUser(null);
    }};
}
