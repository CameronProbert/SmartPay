import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { AppRoute } from "../App";
import { businesses } from "../Data/businesses";
import { User } from "../useAuth";
import { Payment, PaymentStatus } from "../usePayment";
import { FailedPayment } from "./failedPayment";
import { IncompletePayment } from "./incompletePayment";
import { SuccessfulPayment } from "./successfulPayment";
import { currencyFormat } from "./utils";

type PaymentDisplayProps = {
    user: User;
    payment: Payment;
    onPaymentFailed: () => void;
    onPaymentSuccess: () => void;
    onPaymentRestart: () => void;
};

export const PaymentDisplay: React.FC<PaymentDisplayProps> = ({ user, payment, onPaymentFailed, onPaymentSuccess, onPaymentRestart }) => {
    const [paymentError, setPaymentError] = useState<string>();
    const business = businesses.find(business => business.id === payment.businessId);
    if (!business) {
        return <Typography variant="body1">There was an error loading the business. Please scan the QR code again.</Typography>;
    }
    function handlePaymentFailed(error?: string) {
        setPaymentError(error);
        onPaymentFailed();
    }
    let paymentDetails: JSX.Element;
    switch (payment.status) {
        case PaymentStatus.incomplete:
            paymentDetails = <IncompletePayment
                user={user}
                payment={payment}
                onPaymentFailed={handlePaymentFailed}
                onPaymentSuccessful={onPaymentSuccess} />;
            break;
        case PaymentStatus.failed:
            paymentDetails = <FailedPayment onPaymentRestart={onPaymentRestart} paymentError={paymentError} />;
            break;
        case PaymentStatus.successful:
            paymentDetails = <SuccessfulPayment />;
            break;
        default:
            paymentDetails = <Redirect to={AppRoute.home} />;
    }

    return <>
        <section>
            <Typography variant="h2" gutterBottom>Payment Details</Typography>
            <Typography variant="body1" gutterBottom>Amount: <strong>{currencyFormat(payment.amount)}</strong></Typography>
            <Typography variant="body1" gutterBottom>Payment To: <strong>{business.name}</strong></Typography>
        </section>
        <section>
            {paymentDetails}
        </section>
    </>;
};