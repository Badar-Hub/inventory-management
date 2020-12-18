import Address from "./address";
import Metadata from "./metadata";
import OwnershipType from "./ownershipType";

export default class RestaurantInfo extends Metadata {
  static entity = "restaurants";

  constructor(address?: Address) {
    super();
    if (address) this.address = address;
    else this.address = new Address();
  }

  static initialize(restaurantInfo: RestaurantInfo) {
    const restaurantInfoModel = new RestaurantInfo();

    restaurantInfoModel.id = restaurantInfo.id;
    restaurantInfoModel.name = restaurantInfo.name;
    restaurantInfoModel.city = restaurantInfo.city;
    restaurantInfoModel.state = restaurantInfo.state;
    restaurantInfoModel.zipCode = restaurantInfo.zipCode;
    restaurantInfoModel.storeNumber = restaurantInfo.storeNumber;
    restaurantInfoModel.ownershipType = restaurantInfo.ownershipType;
    restaurantInfoModel.contactName = restaurantInfo.contactName;
    restaurantInfoModel.contactNumber = restaurantInfo.contactNumber;
    restaurantInfoModel.addressID = restaurantInfo.addressID;
    restaurantInfoModel.address = restaurantInfo.address;
    restaurantInfoModel.timeZone = restaurantInfo.timeZone;
    restaurantInfoModel.online = restaurantInfo.online;

    return restaurantInfoModel;
  }

  id!: string;

  name = "";

  city = "";

  state = "";

  zipCode!: number;

  storeNumber!: number;

  ownershipType: OwnershipType = OwnershipType.NotSet;

  contactName = "";

  contactNumber!: number;

  addressID!: number;

  address: Address;

  timeZone = "";

  online = false;
}
