
// Generate QR code data for eSewa/Khalti payments
export const generatePaymentQR = (amount: number): string => {
  // eSewa QR code format for Nepal
  const esewaData = `esewa://pay?amt=${amount}&pid=INV-${Date.now()}&pcd=EPAYTEST`;
  return esewaData;
};
