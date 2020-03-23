import {BOTTOM_TAB_CHANGED, EDITABLE_TOP_TAB_CHANGED} from './action-types';

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
