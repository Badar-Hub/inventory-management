export default interface IActivityLogInfo {
  entityID: string;
  entityType: string;
  event: string;
  propertyName?: string;
  propertyType?: string;
  newValue?: string;
  oldValue?: string;
  timeLabel: string;
  timeStamp: string;
  username: string;
}
