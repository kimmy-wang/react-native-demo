import {
  BOTTOM_TAB_CHANGED,
  EDITABLE_TOP_TAB_CHANGED,
  APP_INTRO_SLIDES_LOAD,
  DARK_MODE_CHANGED,
  WEBVIEW_URL_CHANGED,
  WEBSOCKET_URL_CHANGED,
} from './action-types';
import defaultSlides from '../constants/app-intro';

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

export const fetchAppIntroSlides = () => {
  return (dispatch, getState) => {
    // const state = getState();
    dispatch({
      type: APP_INTRO_SLIDES_LOAD,
      slidesLoading: true,
    });
    fetch('https://api.upcwangying.com/slides.json')
      .then(response => response.json())
      .then(resJson => {
        dispatch({
          type: APP_INTRO_SLIDES_LOAD,
          slides: resJson || defaultSlides,
          slidesLoading: false,
        });
      })
      .catch(err => {
        dispatch({
          type: APP_INTRO_SLIDES_LOAD,
          slidesLoading: false,
        });
        console.error('[AppIntro] fetch error: ', err);
      });
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
