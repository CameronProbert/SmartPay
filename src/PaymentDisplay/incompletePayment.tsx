import { Button, ButtonGroup, CircularProgress, FormControl, FormLabel } from "@material-ui/core";
import React, { useState } from "react";
import { User } from "../useAuth";
import { Payment } from "../usePayment";
import { paymentHandlers, PaymentHandlerType } from "./paymentHandler";

type IncompletePaymentProps = {
    user: User;
    payment: Payment;
    onPaymentSuccessful: () => void;
    onPaymentFailed: (error?: string) => void;
};

export const IncompletePayment: React.FC<IncompletePaymentProps> = ({ user, payment, onPaymentSuccessful, onPaymentFailed }) => {
    const [paymentInProgress, setPaymentInProgress] = useState<boolean>(false);
    const [paymentHandler, setPaymentHandler] = useState<PaymentHandlerType>(PaymentHandlerType.card);

    async function handlePayment() {
        if (paymentInProgress) return;
        setPaymentInProgress(true);
        const wasSuccessful = await paymentHandlers[paymentHandler].processPayment(user, payment);
        setPaymentInProgress(false);
        if (wasSuccessful.ok)
            onPaymentSuccessful();
        else
            onPaymentFailed(wasSuccessful.error);
    }

    return <>
        <FormControl>
            <FormLabel htmlFor="input-payment-methods">Payment Method: </FormLabel>
            <ButtonGroup id="input-payment-methods" variant='contained'>
                {Object.keys(paymentHandlers).map(paymentHandlerType => {
                    const handler = paymentHandlers[paymentHandlerType as PaymentHandlerType];
                    return <Button
                        key={paymentHandlerType}
                        color={paymentHandlerType === paymentHandler ? 'secondary' : 'inherit'}
                        onClick={() => setPaymentHandler(handler.type)}
                    >
                        {handler.name}
                    </Button>;
                })}
            </ButtonGroup>
        </FormControl>
        <Button
            color='primary'
            onClick={handlePayment}
            style={{ display: 'flex', alignItems: 'center' }}
            startIcon={paymentInProgress ? <CircularProgress color='inherit' /> : undefined}
            fullWidth
        >
            {paymentInProgress ? <span>Processing...</span> : 'Proceed'}
        </Button>
    </>;
};