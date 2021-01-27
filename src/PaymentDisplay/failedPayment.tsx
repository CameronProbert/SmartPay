import { Button, Typography } from "@material-ui/core";
import React from "react";

type IncompletePaymentProps = {
    onPaymentRestart: () => void;
    paymentError?: string;
};

export const FailedPayment: React.FC<IncompletePaymentProps> = ({ onPaymentRestart, paymentError }) => {
    return <>
        <Typography variant="h4" color='error'>Payment Unsuccessful</Typography>
        <Typography variant="body1">Reason: {paymentError ?? 'Unknown'}</Typography>
        <Button style={{ backgroundColor: 'red' }} fullWidth onClick={onPaymentRestart}>Retry?</Button>
    </>;
};