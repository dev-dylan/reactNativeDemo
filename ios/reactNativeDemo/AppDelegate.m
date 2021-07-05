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
#import <SensorsAnalyticsSDK/SensorsAnalyticsSDK.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"reactNativeDemo"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootView.frame = rootViewController.view.bounds;
  [rootViewController.view addSubview:rootView];
  UINavigationController *navc = [[UINavigationController alloc] initWithRootViewController:rootViewController];
  self.window.rootViewController = navc;
  [self.window makeKeyAndVisible];
  
  //初始化 SA SDK
  [self init_SA:launchOptions];

  return YES;
}


//初始化 SA
-(void)init_SA:(NSDictionary *)launchOptions{
  
  static NSString* Sa_Default_ServerURL = @"http://10.120.243.129:8106/sa?project=default";
  
//  static NSString* Sa_Default_ServerURL = @"http://test-syg.datasink.sensorsdata.cn/sa?token=27f1e21b78daf376&project=jiangwenwen";
  SAConfigOptions *options = [[SAConfigOptions alloc] initWithServerURL:Sa_Default_ServerURL launchOptions:launchOptions];
  //设置全埋点事件  | SensorsAnalyticsEventTypeAppClick
  options.autoTrackEventType = SensorsAnalyticsEventTypeAppEnd |SensorsAnalyticsEventTypeAppStart | SensorsAnalyticsEventTypeAppClick | SensorsAnalyticsEventTypeAppViewScreen;
//  options.enableHeatMap = YES;
//  options.enableVisualizedAutoTrack = YES;
  //开启 crash 采集
  options.enableTrackAppCrash = YES;
  
  options.flushInterval = 30 * 1000; //设置上传间隔
  options.maxCacheSize = 20000;
//  options.enableReferrerTitle = YES;
  options.enableJavaScriptBridge = YES;
  [SensorsAnalyticsSDK startWithConfigOptions:options];
  [[SensorsAnalyticsSDK sharedInstance] enableLog:YES];
//  [[SensorsAnalyticsSDK sharedInstance] clearReferrerWhenAppEnd];

  //公共属性
  //,@"ces":@"444",@"$project":@"projet0",@"$time":[self stringToNsdate]],@"$token":@"token0"
  [[SensorsAnalyticsSDK sharedInstance] registerSuperProperties:@{@"AAA":UIDevice.currentDevice.identifierForVendor.UUIDString,@"ces":@"444"}];
  
  //注册动态公共属性
  [[SensorsAnalyticsSDK sharedInstance] registerDynamicSuperProperties:^NSDictionary<NSString *,id> * _Nonnull{
      return @{@"dynamic":[NSDate date] };
  }];
  
  //h5 打通方案
//  [[SensorsAnalyticsSDK sharedInstance] addWebViewUserAgentSensorsDataFlag:NO];
  //设置上传网络策略
  // [[SensorsAnalyticsSDK sharedInstance] setFlushNetworkPolicy:SensorsAnalyticsNetworkTypeNONE];
  //采集屏幕方向
  [[SensorsAnalyticsSDK sharedInstance] enableTrackScreenOrientation:YES];
  //采集 GPS 信息
  [[SensorsAnalyticsSDK sharedInstance] enableTrackGPSLocation:YES];
  [[SensorsAnalyticsSDK sharedInstance] enableHeatMap];
  [[SensorsAnalyticsSDK sharedInstance] enableVisualizedAutoTrack];

}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  if ([[SensorsAnalyticsSDK sharedInstance] canHandleURL:url]) {
    [[SensorsAnalyticsSDK sharedInstance] handleSchemeUrl:url];
  }
  return YES;
}

@end
