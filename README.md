# ReactNativeDemo

## Install

```npm
yarn install
# npm install
```

## Run

以下操作在Mac平台进行

#### For iOS

```
# 列出安装的所有可用的设备
xcrun instruments -s

# 开启指定模拟器（上面的列表就是可用模拟器名称）
xcrun instruments -w "iPad Pro (10.5-inch) (12.2)"
```

```npm
yarn ios
# npm run ios
```

#### For Android

```
cd ~/Library/Android/sdk/tools/

// 查看模拟设备列表
./emulator -list-avds

// 启动某个模拟设备
./emulator @AVD_name
./emulator @Pixel_API_23
```

```npm
yarn android
# npm run android
```

## Release

使用[Code Push](https://github.com/Microsoft/react-native-code-push)发布, release流程与文档未必一致

### iOS

[React Native打包iOS](https://blog.whezh.com/react-native-ios-bundle/)

### Android

[React Native打包Android](https://reactnative.dev/docs/signed-apk-android)
