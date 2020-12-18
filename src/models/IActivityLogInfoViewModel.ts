import ActivityLogEventType from "./activityLogEventType";

export default interface IActivityLogInfoViewModel {
  entityID: string;
  entityType: string;
  event: ActivityLogEventType;
  propertyName?: string;
  propertyType?: string;
  newValue?: string;
  oldValue?: string;
  timeLabel: string;
  timeStamp: string;
  username: string;
}
