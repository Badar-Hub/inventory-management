export type AddPaymentMethod = {
  paymentType: string[];
  orderCondition: string;
};

export default interface ViewPaymentMethodModel {
  paymentDetails: Array<AddPaymentMethod>;
}
