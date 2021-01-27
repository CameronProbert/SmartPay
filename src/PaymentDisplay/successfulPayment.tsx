import { Button } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { AppRoute } from "../App";

export const SuccessfulPayment: React.FC = () => {
    const { push } = useHistory();
    function handleScanAnother() {
        push(AppRoute.scan);
    }
    function handleGoHome() {
        push(AppRoute.home);
    }
    return <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        <Check htmlColor='green' />
        <Button fullWidth onClick={handleScanAnother}>Scan another QR Code</Button>
        <Button fullWidth onClick={handleGoHome}>Home</Button>
    </section>;
};