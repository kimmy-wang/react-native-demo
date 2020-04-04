import {
  BOTTOM_TAB_CHANGED,
  EDITABLE_TOP_TAB_CHANGED,
  DARK_MODE_CHANGED,
  WEBVIEW_URL_CHANGED,
  WEBSOCKET_URL_CHANGED,
} from './action-types';

export const changeBottomTabs = bottomTabs => {
  return {
    type: BOTTOM_TAB_CHANGED,
    bottomTabs,
  };
};

export const changeEditableTopTabs = editableTopTabs => {
  return {
    type: EDITABLE_TOP_TAB_CHANGED,
    editableTopTabs,
  };
};

export const changeDarkMode = darkMode => {
  return {
    type: DARK_MODE_CHANGED,
    darkMode,
  };
};

export const changeWebViewUrl = webViewUrl => {
  return {
    type: WEBVIEW_URL_CHANGED,
    webViewUrl,
  };
};

export const changeWebsocketUrl = websocketUrl => {
  return {
    type: WEBSOCKET_URL_CHANGED,
    websocketUrl,
  };
};
