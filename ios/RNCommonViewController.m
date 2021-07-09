//
//  RNCommonViewController.m
//  reactNativeDemo
//
//  Created by 彭远洋 on 2021/7/9.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import "RNCommonViewController.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@interface RNCommonViewController () <RCTBridgeDelegate>

@property (nonatomic, copy) NSString *bundleName;

@end

@implementation RNCommonViewController

- (void)viewDidLoad {

  [super viewDidLoad];
  self.view.backgroundColor = [UIColor lightGrayColor];
  self.automaticallyAdjustsScrollViewInsets = YES;

  if (_moduleName.length < 1) {
    _moduleName = @"reactNativeDemo";
    _bundleName = @"main";
  } else {
    _bundleName = _moduleName;
  }

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:_moduleName
                                            initialProperties:nil];
  rootView.frame = self.view.bounds;
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  [self.view addSubview:rootView];
}

-(NSURL *)sourceURLForBridge:(RCTBridge *)bridge {

#if DEBUG
  if ([_moduleName isEqualToString:@"reactNativeDemo"]) {
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  } else
#endif
    return [[NSBundle mainBundle] URLForResource:_bundleName withExtension:@"jsbundle"];
}

@end
