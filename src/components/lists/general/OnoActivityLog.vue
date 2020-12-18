<template>
  <div>
    <div v-if="IsLoading" class="q-my-md">
      <q-skeleton :height="`${$q.screen.height - 100}px`" />
    </div>
    <div v-else>
      <h4 class="font-rubik-medium">{{ metadata.name.label }}</h4>
      <q-card flat>
        <q-card-section class="shadow-3 q-pl-sm q-pt-md">
          <div class="q-pl-sm">
            <OnoList
              :metadata="listMetadata"
              :tableDef="table"
              :data="data ? data : {}"
              @dataRequested="dataRequested"
              :IsLoading="isLoadingData"
              :suppressBody="true"
              :suppressHeader="true"
              :suppressFooter="true"
              :simpleMode="true"
              ref="onoList"
            >
              <template #header>
                <span></span>
              </template>
              <template v-slot:body="{ props }">
                <q-tr
                  :props="props"
                  :key="`e_${props.row.timestamp}`"
                  class="q-virtual-scroll--with-prev"
                >
                  <q-td colspan="100%">
                    <div class="row q-mb-md">
                      <h5 class="q-pr-sm q-ma-none font-lato-semi-bold">
                        {{ props.row.dateLabel }}
                      </h5>
                      <p
                        @click="toggleDate(props.row)"
                        class="q-ma-none display-tag text-h6 font-lato-semi-bold"
                      >
                        {{
                          !props.row.expand
                            ? `${metadata.showText.label}`
                            : `${metadata.hideText.label}`
                        }}
                      </p>
                    </div>
                    <div
                      v-for="(activitylog, idx) in props.row.data"
                      :key="idx"
                      :style="{ display: props.row.expand ? 'flex' : 'none' }"
                      class="q-mt-sm"
                    >
                      <p class="q-px-lg time-label font-lato-semi-bold">
                        {{ activitylog.timeLabel }}
                      </p>
                      <q-icon
                        class="activity-log-icon q-mr-sm"
                        :style="{ backgroundColor: getIconColor(activitylog.event) }"
                        size="sm"
                        :name="getIcon(activitylog.event)"
                      />

                      <p class="log-color font-lato-semi-bold q-mt-xs">
                        {{ activitylog.username }}
                        <span :style="{ color: getEventColor(activitylog.event) }">{{
                          getEventValue(activitylog.event)
                        }}</span>
                        {{ getEventDescription(activitylog) }}
                      </p>
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </OnoList>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import ActivityLogService from "@/services/implementations/activityLog.service";
import UtilSvc from "@/services/implementations/util.service";
import { ValuesMockService } from "@/services/implementations";
import OnoList from "@/components/lists/OnoList.vue";
import ActivityLogDto from "@/view-models/activity-logs/activityLogDto";
import ActivityLogEventType from "@/models/activityLogEventType";
import {
  CollectionMetadata,
  IActivityLogInfo,
  metadata,
  PagedRequest,
  PagedResult
} from "@/models";
import Table from "@/view-models/Lists/table";
import Column from "@/view-models/Lists/column";
import FilterOperator from "@/view-models/Lists/filterOperator";
import Filter from "@/view-models/Lists/filter";
import { List } from "linq-collections";
import OnoBase from "../base/Base.vue";

@Component({
  components: {
    OnoList
  }
})
export default class OnoActivityLog extends OnoBase {
  private data: PagedResult<ActivityLogDto> = {
    pageSize: 50,
    pageCount: 1,
    currentPage: 1,
    results: [],
    rowCount: 1
  };

  table: Table = new Table([
    new Column("entitytype", "Type", true),
    new Column("event", "Restaurant Name"),
    new Column("propertyname", "Zip Code"),
    new Column("propertytype", "Actions", true, "width: 200px"),
    new Column("username", "Actions", true, "width: 200px")
  ]);

  listMetadata: CollectionMetadata = { sortable: [], filterable: [] };

  private activityLogService!: ActivityLogService;

  private IsLoading = true;

  private IsDisplay = false;

  private rawData: IActivityLogInfo[] = [];

  private ValueService!: ValuesMockService;

  private isLoadingData: boolean = false;

  private isLoadingMoreData: boolean = false;

  private metadata!: metadata;

  private UtilSvc!: UtilSvc;

  @Ref() onoList!: any;

  toggleDate(row: ActivityLogDto) {
    row.expand = !row.expand;
    const curFilters = this.onoList.activeFilters as List<Filter>;
    if (row.expand) {
      if (curFilters.any(x => x.column === "timestamp")) {
        const filter = curFilters.single(x => x.column === "timestamp");
        curFilters.remove(filter);

        this.onoList.filtersApplied(curFilters);
      }
    } else {
      const curTimestamp = new Date(row.timestamp);
      const filterTimestamp = `${curTimestamp.getFullYear()}-${curTimestamp.getMonth()}-${curTimestamp.getDate()}`;
      const newFilter = new Filter();
      newFilter.column = "timestamp";
      newFilter.value = filterTimestamp;
      newFilter.operatorModel = {
        label: "NotContains",
        value: FilterOperator.NotContains
      };
      curFilters.push(newFilter);
      this.onoList.filtersApplied(curFilters);
    }
  }

  async dataRequested(event: PagedRequest) {
    this.isLoadingData = true;

    event.pageSize = 50;
    const nextRawData = await this.activityLogService.get(event);
    this.rawData = [...this.rawData, ...nextRawData.results];
    this.data = { ...nextRawData, results: this.activityLogService.convertToDTO(this.rawData) };
    this.isLoadingMoreData = false;
    this.isLoadingData = false;
  }

  created() {
    this.table = new Table([
      new Column("entitytype", "Type", true),
      new Column("event", "Restaurant Name"),
      new Column("propertyname", "Zip Code"),
      new Column("propertytype", "Actions", true, "width: 200px"),
      new Column("username", "Actions", true, "width: 200px")
    ]);
  }

  getEventDescription(input: IActivityLogInfo) {
    let activity = null;
    switch (input.event) {
      default:
      case "Update":
        activity = `${this.UtilSvc.camelCaseToSentence(
          input.entityType!
        )} > Taking ${this.UtilSvc.camelCaseToSentence(input.propertyName!)} from ${
          input.oldValue ? input.oldValue : "0"
        } to ${input.newValue}`;
        break;
      case "Delete":
        activity = `${this.UtilSvc.camelCaseToSentence(
          input.entityType!
        )} > ${this.UtilSvc.camelCaseToSentence(input.propertyName!)}`;
        break;
      case "Insert":
      case "Added":
        activity = `${this.UtilSvc.camelCaseToSentence(
          input.entityType!
        )} > Setting ${this.UtilSvc.camelCaseToSentence(input.propertyName!)} to ${input.newValue}`;
        break;
    }
    return activity;
  }

  getEventValue(input: ActivityLogEventType) {
    let event = null;
    if (input === ActivityLogEventType.Update) event = "updated";
    else if (input === ActivityLogEventType.Delete) event = "removed";
    else if (input === ActivityLogEventType.Insert) event = "inserted";
    else if (input === ActivityLogEventType.Added) event = "added";
    return event;
  }

  getEventColor(event: ActivityLogEventType) {
    let color = null;
    if (event === ActivityLogEventType.Update) color = "#43B254";
    else if (event === ActivityLogEventType.Delete) color = "#FF1F1F";
    else if (event === ActivityLogEventType.Insert || event === ActivityLogEventType.Added)
      color = "#006DEB";
    return color;
  }

  getIconColor(event: ActivityLogEventType) {
    let backgroundColor = null;
    if (event === ActivityLogEventType.Update) backgroundColor = "#175d11";
    else if (event === ActivityLogEventType.Delete) backgroundColor = "#97110e";
    else if (event === ActivityLogEventType.Insert) backgroundColor = "#1c589b";
    return backgroundColor;
  }

  getIcon(event: ActivityLogEventType) {
    let name = null;
    if (event === ActivityLogEventType.Update) name = "ono-refresh";
    else if (event === ActivityLogEventType.Delete) name = "ono-remove";
    else if (event === ActivityLogEventType.Insert) name = "none";
    return name;
  }

  mounted() {
    this.IsLoading = true;
    this.activityLogService = this.container.get(ActivityLogService);
    this.activityLogService.getModelMetadata().then(data => {
      this.metadata = data;
      this.IsLoading = false;
    });
    this.activityLogService.getCollectionMetadata().then(data => {
      this.listMetadata = data;
    });
    this.UtilSvc = this.container.get(UtilSvc);

    if (this.$route.query.page) {
      this.$router.replace({ query: { ...this.$route.query, page: "1" } });
    }
    this.isLoadingData = true;
  }
}
</script>

<style lang="scss" scoped>
.display-tag {
  color: #006deb;
  cursor: pointer;
}
.activity-log-icon {
  width: 17px;
  height: 17px;
  padding: 7px;
  border-radius: 50%;
  text-align: center;
}

.time-label {
  color: #a0a0a0;
}

.log-color {
  color: #717171;
}
</style>
