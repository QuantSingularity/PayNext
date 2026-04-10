"use client";

import {
  Html5QrcodeScanner,
  Html5QrcodeScanType,
  type QrcodeErrorCallback,
  type QrcodeSuccessCallback,
} from "html5-qrcode";
import React, { useEffect, useRef } from "react";

interface QrScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: unknown) => void;
  onScanFailure?: (error: unknown) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({
  onScanSuccess,
  onScanFailure,
}) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const hasScannedRef = useRef<boolean>(false);
  const qrcodeRegionId = "html5qr-code-full-region";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const verbose = false;

    const qrCodeSuccessCallback: QrcodeSuccessCallback = (
      decodedText,
      decodedResult,
    ) => {
      if (!hasScannedRef.current) {
        hasScannedRef.current = true;
        onScanSuccess(decodedText, decodedResult);
      }
    };

    const qrCodeErrorCallback: QrcodeErrorCallback = (errorMessage) => {
      if (onScanFailure) {
        onScanFailure(errorMessage);
      }
    };

    if (!scannerRef.current) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        qrcodeRegionId,
        {
          fps: 10,
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
            const qrboxSize = Math.floor(minEdge * 0.7);
            return {
              width: qrboxSize,
              height: qrboxSize,
            };
          },
          rememberLastUsedCamera: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        },
        verbose,
      );

      html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);
      scannerRef.current = html5QrcodeScanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => {
          console.error(
            "Failed to clear html5-qrcode scanner on unmount.",
            error,
          );
        });
        scannerRef.current = null;
      }
    };
  }, [onScanSuccess, onScanFailure]);

  return <div id={qrcodeRegionId} className="w-full" />;
};

export default QrScanner;
