import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATIONS,
  REMOVE_ALL_NOTIFICATIONS,
  LOAD_NOTIFICATIONS,
} from "./notificationActionTypes";
import { SCHEDULED_NOTIFICATION } from "../../utils/notificationsConstants";

import {
  loadNotificationsStorage,
  addNotificationStorage,
  removeNotificationsStorage,
  removeAllNotificationsStorage,
} from "../../utils/notificationStorageApi";
import {
  schedulePushNotification,
  removeNotificationsExpo,
} from "../../utils/notificationsExpoApi";

export async function loadNotifications(dispatch, getState) {
  const notifications = await loadNotificationsStorage();
  dispatch({
    type: LOAD_NOTIFICATIONS,
    payload: notifications,
  });
  return notifications;
}

export function addNotification(dateTime) {
  return async function saveNewNotification(dispatch, getState) {
    dispatch({
      type: ADD_NOTIFICATION,
      payload: { id: dateTime, status: SCHEDULED_NOTIFICATION },
    });
    schedulePushNotification(dateTime);
    addNotificationStorage(dateTime);
  };
}

export async function removeNotifications(dispatch, getState, removeDateTime) {
  dispatch({
    type: REMOVE_NOTIFICATIONS,
    payload: { removeDateTime },
  });
  removeNotificationsExpo(removeDateTime);
  removeNotificationsStorage(removeDateTime);
  return {};
}

export async function removeAllNotifications(dispatch, getState) {
  const response = await removeAllNotificationsStorage();
  dispatch({
    type: REMOVE_ALL_NOTIFICATIONS,
    payload: {},
  });
  return response;
}
