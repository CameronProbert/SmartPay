import { User } from "../useAuth";
import { Payment } from "../usePayment";

export enum PaymentHandlerType {
    card = 'card',
    wallet = 'wallet'
}

type PaymentResponse = { ok: boolean, error?: string; };
type PaymentHandlerFn = (user: User, payment: Payment) => Promise<PaymentResponse>;
export type PaymentHandler = {
    type: PaymentHandlerType;
    name: string;
    processPayment: PaymentHandlerFn;
};
const cardPaymentHandler: PaymentHandler = {
    type: PaymentHandlerType.card,
    name: 'Card',
    processPayment: (user, payment) => {
        console.log('Payment type card always succeeds. Select wallet to succeed');
        console.log('POST to /Payments', {
            body: {
                businessId: payment.businessId,
                userId: user.userId,
                amount: payment.amount,
            }
        });

        // TODO add proper API call here
        return new Promise(resolve => {
            setTimeout(() => resolve({ ok: true }), 2000);
        });
    }
};
const walletPaymentHandler: PaymentHandler = {
    type: PaymentHandlerType.wallet,
    name: 'Wallet',
    processPayment: (user, payment) => {
        console.log('Payment type wallet always fails. Select card to succeed');
        console.log('POST to /Payments', {
            body: {
                businessId: payment.businessId,
                userId: user.userId,
                amount: payment.amount,
            }
        });

        // TODO add proper API call here
        return new Promise(resolve => {
            setTimeout(() => resolve({ ok: false, error: 'Not enough $$$ in your wallet' }), 2000);
        });
    }
};

/** different payment options */
export const paymentHandlers: Record<PaymentHandlerType, PaymentHandler> = {
    [PaymentHandlerType.card]: cardPaymentHandler,
    [PaymentHandlerType.wallet]: walletPaymentHandler,
};