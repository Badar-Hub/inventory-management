import { FulfillmentTypes, IRestaurantCheckout } from "@/models";
import { OrderConditionOption } from "@/models/restaurantCheckout";
import { metadata } from "@/models/metadata";

export type checkboxToogleType = {
  label: string;
  selected: boolean;
  value?: string | boolean | number;
};

enum ToggleValues {
  ALLOW_ORDER = "allowOrderUpdating",
  SEND_CONFIRMATION = "sendCustomerOrderConfirmationEmail",
  SEND_CAANCELLATION = "sendCancellationEmail",
  SHOW_RECIPT = "showTipSignatureOnReceipt"
}

export default class RestaurantCheckoutViewModel {
  id: string;

  orderMaxAmount: number;

  checkoutOrderCondition: OrderConditionOption;

  checkboxArray: Array<checkboxToogleType>;

  toggleArray: Array<checkboxToogleType>;

  constructor() {
    this.id = "";
    this.orderMaxAmount = 0;
    this.checkoutOrderCondition = { id: "", label: "" };
    this.checkboxArray = [];
    this.toggleArray = [];
  }

  private allowTipValues() {
    const selectedCheckbox = this.checkboxArray.filter(f => f.selected);
    const allowTipArray = selectedCheckbox.map(map => map.value);
    return allowTipArray.toString();
  }

  private toggleData(toggleValue: ToggleValues) {
    return this.toggleArray.find(f => f.value === toggleValue)?.selected;
  }

  initialize(
    rawData: IRestaurantCheckout,
    metaData: metadata,
    orderConditions: Array<OrderConditionOption>
  ) {
    this.id = rawData.id;
    this.orderMaxAmount = rawData.orderMaxDollarAmount;
    this.checkoutOrderCondition = orderConditions.find(
      f => f.id === rawData.checkoutOrderConditionID
    )!;
    this.checkboxArray = [
      {
        label: metaData.curbside.label!,
        value: FulfillmentTypes.CURBSIDE,
        selected: rawData.allowTips ? rawData.allowTips.includes(FulfillmentTypes.CURBSIDE) : false
      },
      {
        label: metaData.delivery.label!,
        value: FulfillmentTypes.DELIVERY,
        selected: rawData.allowTips ? rawData.allowTips.includes(FulfillmentTypes.DELIVERY) : false
      },
      {
        label: metaData.dineIn.label!,
        value: FulfillmentTypes.DINEIN,
        selected: rawData.allowTips ? rawData.allowTips.includes(FulfillmentTypes.DINEIN) : false
      },
      {
        label: metaData.driveThru.label!,
        value: FulfillmentTypes.DRIVETHROUGH,
        selected: rawData.allowTips
          ? rawData.allowTips.includes(FulfillmentTypes.DRIVETHROUGH)
          : false
      },
      {
        label: metaData.pickUp.label!,
        value: FulfillmentTypes.PICKUP,
        selected: rawData.allowTips ? rawData.allowTips.includes(FulfillmentTypes.PICKUP) : false
      }
    ];
    this.toggleArray = [
      {
        label: metaData.allowOrderUpdating.label!,
        value: ToggleValues.ALLOW_ORDER,
        selected: rawData.allowOrderUpdating
      },
      {
        label: metaData.sendCustomerOrderConfirmation.label!,
        value: ToggleValues.SEND_CONFIRMATION,
        selected: rawData.sendCustomerOrderConfirmationEmail
      },
      {
        label: metaData.sendCancellationEmail.label!,
        value: ToggleValues.SEND_CAANCELLATION,
        selected: rawData.sendCancellationEmail
      },
      {
        label: metaData.showTipSignatureOnRecipt.label!,
        value: ToggleValues.SHOW_RECIPT,
        selected: rawData.showTipSignatureOnReceipt
      }
    ];
  }

  mapViewToModel(): IRestaurantCheckout {
    return {
      id: this.id,
      orderMaxDollarAmount: this.orderMaxAmount,
      checkoutOrderConditionID: this.checkoutOrderCondition.id,
      allowTips: this.allowTipValues(),
      allowOrderUpdating: this.toggleData(ToggleValues.ALLOW_ORDER)!,
      sendCustomerOrderConfirmationEmail: this.toggleData(ToggleValues.SEND_CONFIRMATION)!,
      sendCancellationEmail: this.toggleData(ToggleValues.SEND_CAANCELLATION)!,
      showTipSignatureOnReceipt: this.toggleData(ToggleValues.SHOW_RECIPT)!
    };
  }
}
