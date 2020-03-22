import {BOTTOM_TAB_CHANGED} from './action-types';

export const changeBottomTabs = bottomTabs => {
  return {
    type: BOTTOM_TAB_CHANGED,
    bottomTabs,
  };
};
