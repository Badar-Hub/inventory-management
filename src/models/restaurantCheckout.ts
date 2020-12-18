export type OrderConditionOption = { [key: string]: string };

export default interface IRestaurantCheckout {
  id: string;
  allowTips: string;
  allowOrderUpdating: boolean;
  sendCustomerOrderConfirmationEmail: boolean;
  sendCancellationEmail: boolean;
  showTipSignatureOnReceipt: boolean;
  orderMaxDollarAmount: number;
  checkoutOrderConditionID: string;
}
