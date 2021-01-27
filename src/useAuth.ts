import { useState } from "react";

export type User = Readonly<{
    userId: number;
    userName: string;
}>;

export type LoginFn = (userId: string, password: string) => boolean;
export type LogoutFn = () => void;

type AuthHookResult = {
    loggedInUser: User | null;
    login: LoginFn;
    logout: LogoutFn;
};

export function useAuth(): AuthHookResult {
    const [user, setUser] = useState<User | null>(null);

    function login(userId: string, password: string) {
        // For now always log in as the same user
        setUser({ userId: 1234, userName: 'Franco' });
        return true;
    }

    function logout() {
        setUser(null);
    }

    return {
        loggedInUser: user,
        login,
        logout,
    };
}