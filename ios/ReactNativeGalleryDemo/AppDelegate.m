/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <CodePush/CodePush.h>
#import <UMCommonLog/UMCommonLogHeaders.h>
#import "RNUMConfigure.h"
#import <UMAnalytics/MobClick.h>
#import <UMPush/UMessage.h>
#include <arpa/inet.h>
#import "Constants.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  /*  umeng setting start  */
  [UMCommonLogManager setUpUMCommonLogManager];
  [UMConfigure setLogEnabled:YES];
  
  /* Umeng init */
  [MobClick setScenarioType:E_UM_NORMAL];
  [RNUMConfigure initWithAppkey:UM_AppKey channel:UM_ChannelId];
  
  /* Push功能配置 start */
  UMessageRegisterEntity * entity = [[UMessageRegisterEntity alloc] init];
  //type是对推送的几个参数的选择，可以选择一个或者多个。默认是三个全部打开，即：声音，弹窗，角标
  entity.types = UMessageAuthorizationOptionBadge|UMessageAuthorizationOptionAlert|UMessageAuthorizationOptionSound;
  
  //如果你期望使用交互式(只有iOS 8.0及以上有)的通知，请参考下面注释部分的初始化代码
  if (([[[UIDevice currentDevice] systemVersion]intValue]>=8)&&([[[UIDevice currentDevice] systemVersion]intValue]<10)) {
      UIMutableUserNotificationAction *action1 = [[UIMutableUserNotificationAction alloc] init];
      action1.identifier = @"action1_identifier";
      action1.title=@"打开应用";
      action1.activationMode = UIUserNotificationActivationModeForeground;//当点击的时候启动程序

      UIMutableUserNotificationAction *action2 = [[UIMutableUserNotificationAction alloc] init];  //第二按钮
      action2.identifier = @"action2_identifier";
      action2.title=@"忽略";
      action2.activationMode = UIUserNotificationActivationModeBackground;//当点击的时候不启动程序，在后台处理
      action2.authenticationRequired = YES;//需要解锁才能处理，如果action.activationMode = UIUserNotificationActivationModeForeground;则这个属性被忽略；
      action2.destructive = YES;
      UIMutableUserNotificationCategory *actionCategory1 = [[UIMutableUserNotificationCategory alloc] init];
      actionCategory1.identifier = @"category1";//这组动作的唯一标示
      [actionCategory1 setActions:@[action1,action2] forContext:(UIUserNotificationActionContextDefault)];
      NSSet *categories = [NSSet setWithObjects:actionCategory1, nil];
      entity.categories=categories;
  }
  //如果要在iOS10显示交互式的通知，必须注意实现以下代码
  if ([[[UIDevice currentDevice] systemVersion]intValue]>=10) {
      UNNotificationAction *action1_ios10 = [UNNotificationAction actionWithIdentifier:@"action1_identifier" title:@"打开应用" options:UNNotificationActionOptionForeground];
      UNNotificationAction *action2_ios10 = [UNNotificationAction actionWithIdentifier:@"action2_identifier" title:@"忽略" options:UNNotificationActionOptionForeground];

      //UNNotificationCategoryOptionNone
      //UNNotificationCategoryOptionCustomDismissAction  清除通知被触发会走通知的代理方法
      //UNNotificationCategoryOptionAllowInCarPlay       适用于行车模式
      UNNotificationCategory *category1_ios10 = [UNNotificationCategory categoryWithIdentifier:@"category1" actions:@[action1_ios10,action2_ios10]   intentIdentifiers:@[] options:UNNotificationCategoryOptionCustomDismissAction];
      NSSet *categories = [NSSet setWithObjects:category1_ios10, nil];
      entity.categories=categories;
  }
  [UNUserNotificationCenter currentNotificationCenter].delegate=self;
  [UMessage registerForRemoteNotificationsWithLaunchOptions:launchOptions Entity:entity completionHandler:^(BOOL granted, NSError * _Nullable error) {
      if (granted) {
      }else{
      }
  }];
  /* Push功能配置 start */
  
  /*  umeng setting end  */
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ReactNativeGalleryDemo"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];
#endif
}

#pragma mark - Push

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    if (![deviceToken isKindOfClass:[NSData class]]) return;
    const unsigned *tokenBytes = (const unsigned *)[deviceToken bytes];
    NSString *hexToken = [NSString stringWithFormat:@"%08x%08x%08x%08x%08x%08x%08x%08x",
                          ntohl(tokenBytes[0]), ntohl(tokenBytes[1]), ntohl(tokenBytes[2]),
                          ntohl(tokenBytes[3]), ntohl(tokenBytes[4]), ntohl(tokenBytes[5]),
                          ntohl(tokenBytes[6]), ntohl(tokenBytes[7])];
    NSLog(@"deviceToken:%@",hexToken);
}

//iOS10以下使用这两个方法接收通知
-(void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    [UMessage setBadgeClear:NO];
    [UMessage setAutoAlert:NO];
    if([[[UIDevice currentDevice] systemVersion]intValue] < 10){
        [UMessage didReceiveRemoteNotification:userInfo];
    }
     completionHandler(UIBackgroundFetchResultNewData);
}

//iOS10新增：处理前台收到通知的代理方法
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler{
    NSDictionary * userInfo = notification.request.content.userInfo;
    if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        [UMessage setBadgeClear:NO];
        [UMessage setAutoAlert:NO];
        //应用处于前台时的远程推送接受
        //必须加这句代码
        [UMessage didReceiveRemoteNotification:userInfo];
    }else{
        //应用处于前台时的本地推送接受
    }
    completionHandler(UNNotificationPresentationOptionSound|UNNotificationPresentationOptionBadge|UNNotificationPresentationOptionAlert);
}

//iOS10新增：处理后台点击通知的代理方法
-(void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler{
    NSDictionary * userInfo = response.notification.request.content.userInfo;
    if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        //应用处于后台时的远程推送接受
        //必须加这句代码
        [UMessage didReceiveRemoteNotification:userInfo];
    }else{
        //应用处于后台时的本地推送接受
    }
}
@end
