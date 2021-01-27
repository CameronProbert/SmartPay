import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppRoute } from "../App";

type QrScannerProps = {
    onScan(businessId: number, amount: number): void;
};

// TODO actually scan QR code
export const QrScanner: React.FC<QrScannerProps> = ({ onScan }) => {
    const [scanning, setScanning] = useState<boolean>(false);
    const { push } = useHistory();
    function handleScan() {
        if (scanning) return;
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            onScan(4321, 20);
            push(AppRoute.payment);
        }, 1500);
    }
    return <Button
        onClick={handleScan}
        style={{ display: 'flex', alignItems: 'center' }}
        startIcon={scanning ? <CircularProgress color='inherit' /> : undefined}
    >
        {scanning ? <span>Scanning...</span> : 'Scan QR Code'}
    </Button>;
};