import { inject, injectable } from "inversify";
import IValueModel from "@/models/values/IValueModel";
import ApiService from "./api.service";

export type ListValue = string[] | { [key: string]: any }[];

@injectable()
export default class ValuesService {
  private baseResource: string = "api/values";

  private values: IValueModel[] = [];

  @inject(ApiService) private ApiSvc!: ApiService;

  public initialize(hard: boolean = false): Promise<any> {
    if (this.values && !hard) {
      return new Promise<any>(resolve => {
        resolve(this.values);
      });
    }

    return this.ApiSvc.get<IValueModel[]>(`${this.baseResource}`).then((data: IValueModel[]) => {
      this.values = data;
    });
  }

  public get(name: string): any {
    return this.values.find(x => x.name === name)?.value;
  }

  public async getList(name: string): Promise<any> {
    if (!this.values) {
      this.initialize().then(() => {
        return this.values
          .find(x => x.name === "Enums")
          ?.value.$values!.find((x: any) => x.name === name).values;
      });
    }
  }
}
