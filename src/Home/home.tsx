import Button from "@material-ui/core/Button";
import React from "react";
import { useHistory } from "react-router-dom";
import { AppRoute } from "../App";
import { LogoutFn, User } from "../useAuth";


type HomeProps = {
    user: User | null;
    onLogout: LogoutFn;
};

export const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
    const { push } = useHistory();
    function goToLogin() {
        push(AppRoute.login);
    }
    function goToQrScanner() {
        push(AppRoute.scan);
    }
    function goToLogout() {
        onLogout();
        push(AppRoute.home);
    }
    if (!user) return <Button onClick={goToLogin}>Log In</Button>;
    return <>
        <Button onClick={goToQrScanner}>Scan a QR code</Button>
        <Button onClick={goToLogout}>Log Out</Button>
    </>;
};