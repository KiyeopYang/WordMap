import { combineReducers } from 'redux';

import loader from './loader/reducer';
import noticeDialog from './noticeDialog/reducer';
import webPushSubscription from './webPushSubscription/reducer';
import webPush from './webPush/reducer';

export default combineReducers({
  loader,
  noticeDialog,
  webPushSubscription,
  webPush,
});
