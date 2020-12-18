import { injectable } from "inversify";
import Vue from "vue";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/services/config";

import { CustomAxiosConfig } from "@/services/interfaces/IApiService";
import { PagedRequest } from "@/models/";
import { IApiService } from "@/services/interfaces";
import "reflect-metadata";

@injectable()
export default class ApiService implements IApiService {
  public constructor() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    Vue.axios.defaults.withCredentials = false;
  }

  mapCustomConfigToAxios(onoConfig: CustomAxiosConfig): AxiosRequestConfig {
    const result: AxiosRequestConfig = {
      url: onoConfig.url,
      method: onoConfig.method,
      baseURL: onoConfig.baseURL,
      headers: onoConfig.headers,
      params: onoConfig.params,
      data: onoConfig.data
    };

    return result;
  }

  public async get<T>(resource: string, config?: CustomAxiosConfig | undefined): Promise<T> {
    let axiosConfig: AxiosRequestConfig = {};
    if (config) axiosConfig = this.mapCustomConfigToAxios(config);
    const result: AxiosResponse<T> = await Vue.axios.get<T>(resource, axiosConfig);

    return result.data;
  }

  public async getPaged<T>(resource: string, page: PagedRequest): Promise<T> {
    const result: AxiosResponse<T> = await Vue.axios.get<T>(resource, {
      params: page.buildParams()
    });

    return result.data;
  }

  public async post<T>(
    resource: string,
    data: any = null,
    config?: CustomAxiosConfig | undefined
  ): Promise<T> {
    let axiosConfig: AxiosRequestConfig = {};
    if (config) axiosConfig = this.mapCustomConfigToAxios(config);
    const result: AxiosResponse<T> = await Vue.axios.post<T>(resource, data, axiosConfig);
    return result.data;
  }

  public async put<T>(
    resource: string,
    data: any = null,
    config?: CustomAxiosConfig | undefined
  ): Promise<T> {
    let axiosConfig: AxiosRequestConfig = {};
    if (config) axiosConfig = this.mapCustomConfigToAxios(config);
    const result: AxiosResponse<T> = await Vue.axios.put<T>(resource, data, axiosConfig);
    return result.data;
  }

  public async delete<T>(resource: string, config?: CustomAxiosConfig | undefined): Promise<T> {
    let axiosConfig: AxiosRequestConfig = {};
    if (config) axiosConfig = this.mapCustomConfigToAxios(config);
    const result: AxiosResponse<T> = await Vue.axios.delete<T>(resource, axiosConfig);
    return result.data;
  }

  public handleError(error: string) {
    throw new Error(`ApiService ${error}`);
  }

  public addInterceptor(interceptor: (request: CustomAxiosConfig) => CustomAxiosConfig) {
    Vue.axios.interceptors.request.use(interceptor);
  }
}
