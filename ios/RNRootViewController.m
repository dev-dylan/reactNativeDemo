//
//  RNRootViewController.m
//  reactNativeDemo
//
//  Created by 彭远洋 on 2021/7/9.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import "RNRootViewController.h"
#import "RNCommonViewController.h"

#define RGBA(r, g, b, a) [UIColor colorWithRed:(r)/255.0 green:(g)/255.0 blue:(b)/255.0 alpha:(a)/255.0]
#define RandomColor RGBA(arc4random_uniform(256), arc4random_uniform(256), arc4random_uniform(256), 255.0)
#define SCREEN_WIDTH ([[UIScreen mainScreen] bounds].size.width)

@interface RNRootViewController ()

@end

@implementation RNRootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  self.view.backgroundColor = [UIColor lightGrayColor];
  [self addButtons];
}

- (void)addButtons {
  NSArray *actions = @[@"包含 RN 页面浏览", @"不包含 RN 页面浏览", @"暂时不用按钮 1", @"暂时不用按钮 2", @"暂时不用按钮 3"];
  for (int i = 0; i < actions.count; i++) {
    UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
    CGFloat top = 100 + i * (40 + 5);
    button.frame = CGRectMake(0, top, SCREEN_WIDTH, 40);
    button.backgroundColor = RandomColor;
    button.tag = 10000 + i;
    [button setTitle:actions[i]  forState:UIControlStateNormal];
    [self.view addSubview:button];
    [button addTarget:self action:@selector(buttonClick:) forControlEvents:UIControlEventTouchUpInside];
  }
}

- (void)buttonClick:(UIButton *)sender {
  NSInteger number = sender.tag - 10000;
  RNCommonViewController *common = [[RNCommonViewController alloc] init];
  if (number == 0) {
    [self.navigationController pushViewController:common animated:YES];
  } else if (number == 1) {
    common.moduleName = @"project";
    [self.navigationController pushViewController:common animated:YES];
  }
}

@end
