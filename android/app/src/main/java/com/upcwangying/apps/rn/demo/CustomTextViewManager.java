package com.upcwangying.apps.rn.demo;

import android.widget.TextView;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

class CustomTextViewManager extends SimpleViewManager<TextView> {
    public static final String REACT_CLASS = "RNDCustomTextView";

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected TextView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new TextView(reactContext);
    }

    @ReactProp(name = "text")
    public void setText(TextView view, String text) {
        view.setText(text);
    }
}
