import { inject, injectable } from "inversify";
import { IActivityLogInfo, PagedRequest, PagedResult } from "@/models";
import { CollectionMetadata, metadata } from "@/models/metadata";
import ActivityLogDto from "@/view-models/activity-logs/activityLogDto";
import ApiService from "@/services/implementations/api.service";
import IActivityLogInfoViewModel from "@/models/IActivityLogInfoViewModel";
import ActivityLogEventType from "@/models/activityLogEventType";
import UtilService from "./util.service";
import MetadataService from "./metadata.service";

@injectable()
export default class ActivityLogService {
  private baseResource: string;

  private dows = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  @inject(ApiService) private ApiSvc!: ApiService;

  @inject(MetadataService) private MetadataSvc!: MetadataService;

  @inject(UtilService) private UtilSvc!: UtilService;

  constructor() {
    this.baseResource = "api/auditlogs";
  }

  public async get(pageInfo: PagedRequest): Promise<PagedResult<IActivityLogInfo>> {
    return this.ApiSvc.getPaged<PagedResult<IActivityLogInfo>>(`${this.baseResource}`, pageInfo);
  }

  public async getActivityLogDto(pageInfo: PagedRequest): Promise<PagedResult<ActivityLogDto>> {
    const data = await this.ApiSvc.getPaged<PagedResult<IActivityLogInfo>>(
      `${this.baseResource}`,
      pageInfo
    );

    const parsedData = this.convertToDTO(data.results);

    const result: PagedResult<ActivityLogDto> = { ...data, results: parsedData };
    return result;
  }

  public convertToDTO(rawData: IActivityLogInfo[]): Array<ActivityLogDto> {
    const parsedData: ActivityLogDto[] = [];
    const pagedData: IActivityLogInfo[] | undefined = rawData;
    if (pagedData) {
      for (let i = 0; i < pagedData.length; i += 1) {
        const date: Date = new Date(pagedData[i].timeStamp);
        const existing = parsedData.find(
          dt => new Date(dt.timestamp).toLocaleDateString() === date.toLocaleDateString()
        );
        const parsedTimeLabel = date.toLocaleTimeString();
        pagedData[i].timeLabel = parsedTimeLabel;

        let event: ActivityLogEventType = ActivityLogEventType.Added;
        switch (pagedData[i].event) {
          default:
          case "Update":
            event = ActivityLogEventType.Update;
            break;
          case "Added":
            event = ActivityLogEventType.Added;
            break;
          case "Insert":
            event = ActivityLogEventType.Insert;
            break;
          case "Delete":
            event = ActivityLogEventType.Delete;
            break;
        }
        const dataVM: IActivityLogInfoViewModel = { ...pagedData[i], event };
        if (!existing) {
          const day = this.dows[date.getDay()];
          let dateLabel = "";
          const isToday = this.UtilSvc.isDateToday(date);
          const isYesterday = this.UtilSvc.isDateYesterday(date);
          if (isToday) dateLabel = "Today";
          else if (isYesterday) dateLabel = "Yesterday";
          else dateLabel = `${day} ${date.getDate()}, ${date.getFullYear()}`;
          parsedData.push({
            timestamp: dataVM.timeStamp,
            dateLabel,
            expand: true,
            data: [dataVM]
          });
        } else {
          existing.data.push(dataVM);
        }
      }
    }
    return parsedData;
  }

  public getModelMetadata(): Promise<metadata> {
    return this.MetadataSvc.getModelMetadata(this.baseResource);
  }

  public getCollectionMetadata(): Promise<CollectionMetadata> {
    return this.ApiSvc.get<CollectionMetadata>(`${this.baseResource}/$metadata`);
  }
}
