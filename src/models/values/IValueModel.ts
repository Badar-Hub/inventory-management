export default interface IValueModel {
  id: string;
  name: string;
  value: { "$type": string, [key: string]: any }
}

