/* tslint:disable */
/* eslint-disable */
/**
 * nextjs-tsoa-be
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Item,
} from '../models/index';
import {
    ItemFromJSON,
    ItemToJSON,
} from '../models/index';

export interface GetItemRequest {
    itemId: string;
}

/**
 * ItemsApi - interface
 * 
 * @export
 * @interface ItemsApiInterface
 */
export interface ItemsApiInterface {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ItemsApiInterface
     */
    getAllItemsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Item>>>;

    /**
     */
    getAllItems(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Item>>;

    /**
     * 
     * @param {string} itemId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ItemsApiInterface
     */
    getItemRaw(requestParameters: GetItemRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Item>>;

    /**
     */
    getItem(requestParameters: GetItemRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Item>;

}

/**
 * 
 */
export class ItemsApi extends runtime.BaseAPI implements ItemsApiInterface {

    /**
     */
    async getAllItemsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Item>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/items`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ItemFromJSON));
    }

    /**
     */
    async getAllItems(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Item>> {
        const response = await this.getAllItemsRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getItemRaw(requestParameters: GetItemRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Item>> {
        if (requestParameters.itemId === null || requestParameters.itemId === undefined) {
            throw new runtime.RequiredError('itemId','Required parameter requestParameters.itemId was null or undefined when calling getItem.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/items/{itemId}`.replace(`{${"itemId"}}`, encodeURIComponent(String(requestParameters.itemId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ItemFromJSON(jsonValue));
    }

    /**
     */
    async getItem(requestParameters: GetItemRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Item> {
        const response = await this.getItemRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
