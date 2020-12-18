import { Model } from "@vuex-orm/core";

export default class Address extends Model {
  static entity = "addresses";

  static fields() {
    return {
      id: this.attr(null),
      address1: this.string(""),
      address2: this.string(""),
      city: this.string(""),
      state: this.string(""),
      country: this.string(""),
      firstName: this.string(""),
      lastName: this.string(""),
      company: this.string(""),
      zipCode: this.string(""),
      phone: this.string(""),
      fax: this.string(""),
      latitude: this.number(""),
      longitude: this.number(""),
      manuallyGeocoded: this.boolean("")
    };
  }

  id = "";

  address1 = "";

  address2 = "";

  city = "";

  state = "";

  country = "";

  firstName = "";

  lastName = "";

  company = "";

  zipCode = "";

  phone = "";

  fax = "";

  latitude = 0;

  longitude = 0;

  manuallyGeocoded = false;
}
