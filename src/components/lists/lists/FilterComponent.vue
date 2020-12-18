<template>
  <div>
    <div v-if="IsLoadingMetadata" class="q-my-md">
      <q-skeleton :height="`${$q.screen.height - 100}px`" />
    </div>
    <div v-else>
      <q-card>
        <q-card-section class="shadow-3 q-pa-xs">
          <div class="q-pa-xs">
            <div class="cursor-pointer" @click="showForm = !showForm">
              <div class="row justify-between">
                <div class="row">
                  <div class="row justify-center" :class="{ disabled: !showForm }">
                    <q-icon class="q-my-auto q-mr-xs" name="tune" size="sm" />
                    <p class="text-h6 text-dark q-ma-none">{{ filterMetadata.header.title }}</p>
                  </div>
                </div>
                <div class="row justify-center">
                  <q-icon
                    class="q-my-auto q-mr-xs"
                    :name="!showForm ? `expand_more` : `expand_less`"
                    size="md"
                  />
                </div>
              </div>
            </div>
            <div v-if="showForm">
              <q-card flat round class="filter-form q-mt-sm">
                <q-card-section>
                  <q-form class="q-pa-xs">
                    <div v-for="(filter, i) in allFilters" :key="i" class="row q-mb-md">
                      <div class="col row">
                        <div class="col q-pr-xs">
                          <q-select
                            v-model="filter.column"
                            :label="filterMetadata.inputLabel.filter"
                            :options="filterColumns"
                            input-class="font-lato-semi-bold"
                            dense
                            required
                          />
                        </div>
                        <div class="col q-pl-xs">
                          <q-select
                            v-model="filter.operatorModel"
                            :label="filterMetadata.inputLabel.operator"
                            :options="allOperators"
                            input-class="font-lato-semi-bold"
                            dense
                            required
                          />
                        </div>
                        <div class="col q-pl-xs">
                          <q-input
                            v-model="filter.value"
                            :label="filterMetadata.inputLabel.valueLabel"
                            input-class="font-lato-semi-bold"
                            dense
                            required
                          />
                        </div>
                      </div>
                      <div class="col-auto q-pl-xs">
                        <q-btn
                          @click="removeFilter(filter)"
                          no-caps
                          flat
                          :label="filterMetadata.buttonLable.removeLabel"
                        ></q-btn>
                      </div>
                    </div>
                    <div class="row q-mt-sm">
                      <q-btn
                        @click="addNewFilter"
                        no-caps
                        flat
                        :label="filterMetadata.buttonLable.addFilterLabel"
                        icon="add"
                        size="md"
                        padding="xs xs"
                        align="left"
                        text-color="primary"
                        :ripple="false"
                      ></q-btn>
                    </div>
                    <div class="row">
                      <div class="col"></div>
                      <div class="col-auto">
                        <q-btn
                          no-caps
                          :label="filterMetadata.buttonLable.clearAllLable"
                          padding="xs lg"
                          rounded
                          flat
                          class="q-mx-xs font-lato-semi-bold"
                          @click="clearAllFilters"
                        />
                        <q-btn
                          :disable="hasFilters"
                          no-caps
                          label="Apply"
                          rounded
                          color="accent"
                          unelevated
                          class="q-mx-xs font-lato-semi-bold"
                          padding="xs lg"
                          @click="applyFilters"
                        />
                      </div>
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Filter from "@/view-models/Lists/filter";
import FilterService from "@/services/implementations/filterService";
import FilterOperator from "@/view-models/Lists/filterOperator";
import { List } from "linq-collections";
import { metadata } from "@/models";
import OnoBase from "../base/Base.vue";

@Component({})
export default class FilterComponent extends OnoBase {
  @Prop() startingFilters?: List<Filter>;

  filters: List<Filter> = new List<Filter>();

  showForm: boolean = false;

  private IsLoadingMetadata: boolean = true;

  filterService!: FilterService;

  filterMetadata!: metadata;

  @Prop() filterColumns!: Array<string>;

  mounted() {
    if (this.startingFilters !== undefined) {
      this.filters = this.startingFilters;
    }
    this.filterService = this.container.get(FilterService);
    this.filterService.getMetadata().then(res => {
      this.filterMetadata = res;
      this.IsLoadingMetadata = false;
    });
  }

  allOperators: {
    value: any;
    label: string;
  }[] = Object.keys(FilterOperator).map((key: string) => {
    const tmp = key as keyof typeof FilterOperator;
    return { value: key, label: tmp };
  });

  removeFilter(filter: Filter) {
    this.filters.remove(filter);
  }

  get hasFilters(): boolean {
    const result = this.filters.where(e => {
      return e.column !== "" && e.operatorModel !== undefined && e.value !== undefined;
    });
    return result.count() !== this.filters.count();
  }

  get allFilters(): Filter[] {
    return this.filters.toArray();
  }

  addNewFilter(): void {
    this.filters.push(new Filter());
  }

  clearAllFilters(): void {
    this.filters = new List<Filter>([new Filter()]);
    this.$emit("applied", []);
  }

  applyFilters(): void {
    this.$emit("applied", this.filters);
  }
}
</script>

<style lang="scss">
.filter-form {
  background-color: $light !important;
}
</style>
