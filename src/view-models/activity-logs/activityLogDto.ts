import IActivityLogInfoViewModel from "@/models/IActivityLogInfoViewModel";

export default interface ActivityLogDto {
  dateLabel: string;
  timestamp: string;
  data: Array<IActivityLogInfoViewModel>;
  expand: boolean;
}
