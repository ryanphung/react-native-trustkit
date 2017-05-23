package com.statoil.trustkit.wrapper;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Map;

public class RNTrustKitPlugin extends ReactContextBaseJavaModule {

    public RNTrustKitPlugin(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNTrustKitPlugin";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    @ReactMethod
    public void configure(ReadableMap configuration, Promise promise) {
        promise.reject("not_implemented", "configure for android is not implemented");
    }

}
