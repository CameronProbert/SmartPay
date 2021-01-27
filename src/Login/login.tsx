import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppRoute } from "../App";
import { LoginFn } from "../useAuth";

type ValidationError = [token: string, error: string];
function validate(username: string, password: string): ValidationError[] {
    let validationErrors: ValidationError[] = [];
    if (!username.length) {
        validationErrors = [...validationErrors, ['username', 'required']];
    }
    if (!password.length) {
        validationErrors = [...validationErrors, ['password', 'required']];
    }

    return validationErrors;
}

type LoginProps = {
    onLogin: LoginFn;
};
export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const { push } = useHistory();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    function onLoginAttempt() {
        setSubmitted(true);
        if (validationErrors.length) {
            return;
        }
        else if (onLogin(username, password)) {
            push(AppRoute.home);
        }
    }
    return <section>
        <FormControl>
            <InputLabel htmlFor="input-username">Username</InputLabel>
            <Input id="input-username" />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="input-password">Password</InputLabel>
            <Input id="input-password" type='password' />
        </FormControl>
        <Button onClick={onLoginAttempt}>Log In</Button>
    </section>;
};