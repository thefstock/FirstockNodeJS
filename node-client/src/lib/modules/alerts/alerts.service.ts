import { Inject, Service } from 'typedi';

import { Context, DataSource, PlainObject } from '../../utils';

import endpoints from './alerts.endpoints';
import {
  CancelAlertRequestModel,
  CancelAlertResponseModel,
  CancelGttOrderRequestModel,
  CancelGttOrderResponseModel,
  GetEnabledAlertTypesRequestModel,
  GetEnabledAlertTypesResponseModel,
  GetEnabledGttsRequestModel,
  GetEnabledGttsResponseModel,
  GetPendingAlertRequestModel,
  GetPendingAlertResponseModel,
  GetPendingGttOrderRequestModel,
  GetPendingGttOrderResponseModel,
  GetUnsettledTradingDateRequestModel,
  GetUnsettledTradingDateResponseModel,
  ModifyAlertRequestModel,
  ModifyAlertResponseModel,
  ModifyGttOrderRequestModel,
  ModifyGttOrderResponseModel,
  PlaceGttOrderRequestModel,
  PlaceGttOrderResponseModel,
  SetAlertRequestModel,
  SetAlertResponseModel,
} from './models';

/**
 * The data source service for alerts module.
 */
@Service()
export class AlertsService extends DataSource {
  /**
   * The client context
   */
  @Inject()
  _context: Context;
  get context() {
    return this._context;
  }
  /**
   * Set alert
   * @param data The payload for set alert request
   */
  async setAlert(
    data: PlainObject<SetAlertRequestModel>
  ): Promise<SetAlertResponseModel> {
    const endpoint = endpoints.SET_ALERT;
    return this.send({
      data,
      endpoint,
      requestClass: SetAlertRequestModel,
      responseClass: SetAlertResponseModel,
    });
  }
  /**
   * Cancel alert
   * @param data The payload for cancel alert request
   */
  async cancelAlert(
    data: PlainObject<CancelAlertRequestModel>
  ): Promise<CancelAlertResponseModel> {
    const endpoint = endpoints.CANCEL_ALERT;
    return this.send({
      data,
      endpoint,
      requestClass: CancelAlertRequestModel,
      responseClass: CancelAlertResponseModel,
    });
  }
  /**
   * Modify alert
   * @param data The payload for modify alert request
   */
  async modifyAlert(
    data: PlainObject<ModifyAlertRequestModel>
  ): Promise<ModifyAlertResponseModel> {
    const endpoint = endpoints.MODIFY_ALERT;
    return this.send({
      data,
      endpoint,
      requestClass: ModifyAlertRequestModel,
      responseClass: ModifyAlertResponseModel,
    });
  }
  /**
   * Get pending alert
   * @param data The payload for get pending alert request
   */
  async getPendingAlert(
    data: PlainObject<GetPendingAlertRequestModel>
  ): Promise<GetPendingAlertResponseModel> {
    const endpoint = endpoints.GET_PENDING_ALERT;
    return this.send({
      data,
      endpoint,
      requestClass: GetPendingAlertRequestModel,
      responseClass: GetPendingAlertResponseModel,
    });
  }
  /**
   * Get enabled alert types
   * @param data The payload for get enabled alert types request
   */
  async getEnabledAlertTypes(
    data: PlainObject<GetEnabledAlertTypesRequestModel>
  ): Promise<GetEnabledAlertTypesResponseModel> {
    const endpoint = endpoints.GET_ENABLED_ALERT_TYPES;
    return this.send({
      data,
      endpoint,
      requestClass: GetEnabledAlertTypesRequestModel,
      responseClass: GetEnabledAlertTypesResponseModel,
    });
  }
  /**
   * Place GTT order
   * @param data The payload for place gtt order request
   */
  async placeGttOrder(
    data: PlainObject<PlaceGttOrderRequestModel>
  ): Promise<PlaceGttOrderResponseModel> {
    const endpoint = endpoints.PLACE_GTT_ORDER;
    return this.send({
      data,
      endpoint,
      requestClass: PlaceGttOrderRequestModel,
      responseClass: PlaceGttOrderResponseModel,
    });
  }
  /**
   * Modify GTT order
   * @param data The payload for modify gtt order request
   */
  async modifyGttOrder(
    data: PlainObject<ModifyGttOrderRequestModel>
  ): Promise<ModifyGttOrderResponseModel> {
    const endpoint = endpoints.MODIFY_GTT_ORDER;
    return this.send({
      data,
      endpoint,
      requestClass: ModifyGttOrderRequestModel,
      responseClass: ModifyGttOrderResponseModel,
    });
  }
  /**
   * Cancel GTT order
   * @param data The payload for cancel gtt order request
   */
  async cancelGttOrder(
    data: PlainObject<CancelGttOrderRequestModel>
  ): Promise<CancelGttOrderResponseModel> {
    const endpoint = endpoints.CANCEL_GTT_ORDER;
    return this.send({
      data,
      endpoint,
      requestClass: CancelGttOrderRequestModel,
      responseClass: CancelGttOrderResponseModel,
    });
  }
  /**
   * Get pending GTT order
   * @param data The payload for get pending gtt order request
   */
  async getPendingGttOrder(
    data: PlainObject<GetPendingGttOrderRequestModel>
  ): Promise<GetPendingGttOrderResponseModel> {
    const endpoint = endpoints.GET_PENDING_GTT_ORDER;
    return this.send({
      data,
      endpoint,
      requestClass: GetPendingGttOrderRequestModel,
      responseClass: GetPendingGttOrderResponseModel,
    });
  }
  /**
   * Get enabled GTTs
   * @param data The payload for get enabled gtts request
   */
  async getEnabledGtts(
    data: PlainObject<GetEnabledGttsRequestModel>
  ): Promise<GetEnabledGttsResponseModel> {
    const endpoint = endpoints.GET_ENABLED_GTTS;
    return this.send({
      data,
      endpoint,
      requestClass: GetEnabledGttsRequestModel,
      responseClass: GetEnabledGttsResponseModel,
    });
  }
  /**
   * Get unsettled trading date
   * @param data The payload for get unsettled trading date request
   */
  async getUnsettledTradingDate(
    data: PlainObject<GetUnsettledTradingDateRequestModel>
  ): Promise<GetUnsettledTradingDateResponseModel> {
    const endpoint = endpoints.GET_UNSETTLED_TRADING_DATE;
    return this.send({
      data,
      endpoint,
      requestClass: GetUnsettledTradingDateRequestModel,
      responseClass: GetUnsettledTradingDateResponseModel,
    });
  }
}
