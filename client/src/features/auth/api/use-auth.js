import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currUser = localStorage.getItem('user');
        if (currUser) {
            setUser(JSON.parse(currUser));
        }
    }, []);

    const isAuthenticated = () => {
        return user !== null;
    };

    const setLocalUser = (data) => {
        localStorage.setItem('user', JSON.stringify(data));
    }

    return { user, setLocalUser, isAuthenticated };
}