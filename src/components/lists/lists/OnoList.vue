<template>
  <div>
    <FilterComponent
      :filterColumns="columnsToFilter"
      v-on:applied="filtersApplied"
      :startingFilters="startingFilters"
    ></FilterComponent>

    <br />

    <q-table
      :pagination.sync="pagination"
      :data="data.results"
      :columns="tableDef.columns"
      class="font-lato-medium"
      :class="[simpleMode ? 'simple-mode' : '']"
      :loading="IsLoading"
      :hide-bottom="simpleMode || suppressFooter"
      @request="dataRequest"
      row-key="id"
      binary-state-sort
      ref="table"
      :rows-per-page-options="[5, 10, 25, 50]"
    >
      <template #header="props" v-if="suppressHeader">
        <slot name="header" v-bind:props="props"></slot>
      </template>
      <template #body="props" v-if="suppressBody">
        <slot name="body" v-bind:props="props"></slot>
      </template>
      <template #body-cell="props">
        <q-td :props="props" @click.native="rowClick(props)">
          <slot name="all" v-bind:props="props">
            <div>{{ props.value }}</div>
          </slot>
        </q-td>
      </template>
      <template v-for="col in overrideColumns" #[col.templateName]="props">
        <q-td v-bind:key="col.name" dense :props="props" @click.native="rowClick(props)">
          <slot :name="col.name" v-bind:props="props"></slot>
        </q-td>
      </template>

      <template v-slot:bottom-row v-if="!IsLoading && !isLoadingMetadata">
        <div class="q-table-bottom-row">
          <q-btn
            v-if="showExport"
            flat
            color="primary"
            :label="formMetadata.exportBtnLabel.label"
            size="md"
            class="font-lato-medium "
            icon="ono-export"
            no-caps
            @click="exportTable"
          />
        </div>
      </template>

      <template v-if="suppressFooter" #pagination="scope">
        <slot name="pagination" v-bind:props="scope"></slot>
      </template>
    </q-table>

    <div v-if="simpleMode" class="row justify-center q-py-md">
      <q-btn :disable="isLastPage()" :loading="IsLoading" @click="loadMore" no-caps rounded outline>
        Load More
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { exportFile } from "quasar";
import { Component, Ref, Prop, Watch } from "vue-property-decorator";
import {
  CollectionMetadata,
  PagedResult,
  PagedRequest,
  QuasarPagination,
  MetadataResult
} from "@/models";
import OnoBagde from "@/components/general/OnoBadge.vue";
import FilterComponent from "@/components/lists/FilterComponent.vue";
import Filter from "@/view-models/Lists/filter";
import FilterOperator from "@/view-models/Lists/filterOperator";
import Column from "@/view-models/Lists/column";
import Table from "@/view-models/Lists/table";
import { List } from "linq-collections";
import OnoMetadataBase from "../base/OnoMetadataBase.vue";

function wrapCsvValue(val: any, formatFn?: Function) {
  let formatted = formatFn !== undefined ? formatFn(val) : val;

  formatted = formatted === undefined || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

@Component({
  components: {
    OnoBagde,
    FilterComponent
  }
})
export default class OnoList<T> extends OnoMetadataBase {
  @Prop({
    default: {
      pageSize: 10,
      pageCount: 1,
      currentPage: 1,
      results: [],
      rowCount: 1
    }
  })
  data!: PagedResult<T>;

  @Prop({ default: new Table([]) }) tableDef!: Table;

  get overrideColumns() {
    return this.tableDef.columns.filter((col: Column) => col.override);
  }

  @Prop({ default: { sortable: [], filterable: [] } }) metadata!: CollectionMetadata;

  @Prop({ default: true }) IsLoading!: boolean;

  @Prop({ default: false }) suppressHeader!: boolean;

  @Prop({ default: false }) suppressBody!: boolean;

  @Prop({ default: false }) suppressFooter!: boolean;

  // internal

  startingFilters: List<Filter> = this.parseFilterQuery();

  @Ref() table!: any;

  filterString: string = "";

  activeFilters: List<Filter> = new List<Filter>();

  pagination = new QuasarPagination(1, 10, 0, false, "");

  queryArr: string[] = [];

  @Prop({ default: false }) simpleMode!: boolean;

  get columnsToFilter() {
    return this.metadata.filterable.map(meta => meta.name);
  }

  lastSentPagination?: any;

  // #region init

  mounted() {
    this.parseQuery();
    this.filtersApplied(this.startingFilters);
    this.modelMetadataPath = "api/list";
    this.initMetadata();
  }

  loadMore() {
    if (this.$refs.table as any) {
      (this.$refs.table as any).nextPage();
    }
  }

  isLastPage() {
    let isDisabled = false;
    if (this.$refs.table as any) {
      isDisabled = (this.$refs.table as any).isLastPage;
    }
    return isDisabled;
  }

  @Watch("metadata")
  @Watch("tableDef")
  getSortDataForColumns() {
    this.tableDef.columns.forEach((col: Column) => {
      const matchingSorts = this.metadata.sortable.filter((meta: MetadataResult) => {
        return meta.name.toLowerCase() === col.name.toLowerCase();
      });

      if (matchingSorts.length > 0) {
        col.sortable = true;
      }
    });
  }

  extractString(input: string | (string | null)[]): string {
    if (typeof input === "string") {
      return input;
    }
    return "";
  }

  parseQuery() {
    this.startingFilters = this.parseFilterQuery();

    const { page, rowsPerPage, descending, sortBy } = this.$route.query;

    const isDescending = this.extractString(descending) === "true";

    this.pagination = new QuasarPagination(
      +this.extractString(page),
      +this.extractString(rowsPerPage),
      0,
      isDescending,
      this.extractString(sortBy)
    );
  }

  parseFilterQuery(): List<Filter> {
    const uncheckedQuery = this.$route.query.filter;

    const result = new List<Filter>();
    if (uncheckedQuery === null || uncheckedQuery === undefined) {
      result.push(new Filter());
      return result;
    }

    if (typeof uncheckedQuery === "string") {
      const filter = new Filter();
      filter.fromURLString(uncheckedQuery);
      result.push(filter);
      return result;
    }

    const querys: (string | null)[] = uncheckedQuery;

    if (querys.length < 1) {
      result.push(new Filter());
      return result;
    }

    querys.forEach((query: string | null) => {
      const filter = new Filter();
      filter.fromURLString(query!);
      result.push(filter);
    });

    return result;
  }

  // #endregion

  // # region options

  @Prop({ required: false }) showExport!: boolean;

  exportTable() {
    // naive encoding to csv format
    const content = [this.tableDef.columns.map(col => wrapCsvValue(col.label))]
      .concat(
        this.data.results.map(row =>
          this.tableDef.columns
            .map(col =>
              wrapCsvValue(
                ((row as unknown) as Record<string, string>)[
                  col.field === undefined ? col.name : col.field
                ]
              )
            )
            .join(",")
        )
      )
      .join("\r\n");

    const status = exportFile("table-export.csv", content, "text/csv");

    if (status !== true) {
      this.$q.notify({
        message: "Browser denied file download...",
        color: "negative",
        icon: "warning"
      });
    }
  }

  // #endregion

  // # region request update

  public filtersApplied(filters: List<Filter>) {
    const arr: string[] = [];
    this.queryArr = [];
    filters.forEach((filter: Filter) => {
      if (filter.column === "") {
        return;
      }
      const tmp = filter.operatorModel?.label as keyof typeof FilterOperator;
      filter.operator = tmp as FilterOperator;
      this.queryArr.push(filter.toURLString());
      arr.push(filter.toString());
    });
    const result = arr.join(" and ");
    this.filterString = result;
    this.table.requestServerInteraction();

    this.activeFilters = filters;
  }

  async dataRequest(props: any) {
    this.lastSentPagination = props.pagination;
    const { page, rowsPerPage, descending, sortBy } = props.pagination;
    const request = new PagedRequest(page, rowsPerPage, sortBy, descending);
    request.filter = this.filterString;
    this.$emit("dataRequested", request);
  }

  setQuery() {
    const query: any = this.pagination.getURLQuery();

    if (this.queryArr !== []) {
      query.filter = this.queryArr;
    }

    this.$router.replace({ query });
  }

  // #endregion

  // #region data updates

  @Watch("data")
  onDataUpdate() {
    this.pagination = this.convertPagedResult(
      this.data!,
      this.lastSentPagination.descending,
      this.lastSentPagination.sortBy
    );
    this.setQuery();
  }

  convertPagedResult(
    pagedResult: PagedResult<T>,
    descending: boolean,
    sortBy: string
  ): QuasarPagination {
    return new QuasarPagination(
      pagedResult.currentPage,
      pagedResult.pageSize,
      pagedResult.rowCount,
      descending,
      sortBy
    );
  }

  // #endregion

  rowClick(event: any) {
    this.$emit("rowClick", event);
  }
}
</script>

<style lang="scss">
tr:nth-child(even) {
  background-color: #f2f2f2;
}

.simple-mode {
  tr:nth-child(even) {
    background-color: white;
  }
}

table > *:last-child > tr:last-of-type td {
  border: none;
}
.q-table-bottom-row {
  position: absolute;
  padding: 8px 20px;
}
</style>
