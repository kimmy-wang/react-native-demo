package com.upcwangying.apps.rn.demo;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.umeng.analytics.MobclickAgent;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // 初始化SDK
    MobclickAgent.setSessionContinueMillis(1000L);
    // 选用AUTO页面采集模式
    MobclickAgent.setPageCollectionMode(MobclickAgent.PageMode.LEGACY_AUTO);
  }

  @Override
  public void onResume() {
    super.onResume();
    MobclickAgent.onResume(this);
  }

  @Override
  public void onPause() {
    super.onPause();
    MobclickAgent.onPause(this);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ReactNativeGalleryDemo";
  }
}
