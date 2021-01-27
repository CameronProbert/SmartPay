import { useState } from "react";
import { Business } from "./types";

export enum PaymentStatus {
    incomplete = 'incomplete',
    successful = 'successful',
    failed = 'failed',
}

export type Payment = {
    businessId: number;
    amount: number;
    status: PaymentStatus;
};

type PaymentHookResult = {
    currentPayment: Readonly<Payment> | null;
    paymentSuccess(): void;
    paymentFail(): void;
    restart(): void;
    newPayment(businessId: number, amount: number): Readonly<Payment>;
};

export function usePayments(): PaymentHookResult {
    const [currentPayment, setCurrentPayment] = useState<Readonly<Payment> | null>(null);

    function newPayment(businessId: number, amount: number): Readonly<Payment> {
        const payment: Payment = { businessId, amount, status: PaymentStatus.incomplete };
        setCurrentPayment(payment);
        return payment;
    }

    function paymentSuccess(): void {
        if (!currentPayment || currentPayment.status === PaymentStatus.successful) return;
        const payment: Payment = { ...currentPayment, status: PaymentStatus.successful };
        setCurrentPayment(payment);
    }

    function paymentFail(): void {
        if (!currentPayment || currentPayment.status === PaymentStatus.failed) return;
        const payment: Payment = { ...currentPayment, status: PaymentStatus.failed };
        setCurrentPayment(payment);
    }

    function restart(): void {
        if (!currentPayment || currentPayment.status === PaymentStatus.incomplete) return;
        const payment: Payment = { ...currentPayment, status: PaymentStatus.incomplete };
        setCurrentPayment(payment);
    }

    return {
        currentPayment,
        newPayment,
        paymentFail,
        paymentSuccess,
        restart
    };
}