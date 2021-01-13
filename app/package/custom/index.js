import React, { Component } from 'react';
import { Button, View, Alert,Text } from 'react-native';
import Card from '../../widget/card';
import Package from '../../widget/package';
import { NativeModules } from 'react-native';
import { TouchableHighlight } from 'react-native';

const analytics = NativeModules.RNSensorsAnalyticsModule;
const RNSensorsDataModule = NativeModules.RNSensorsDataModule;

const COMPONENT_LABEL = '跨平台的按钮组件';
const COMPONENT_VALUE = 'Button';

const ButtonList = [
  {
    label : "设置匿名 ID",
    value : "identify",
    params : "0000-0000-1111-11111111",
  },
  {
    label : "注册公共属性",
    value : "registerSuperProperties",
    params : "0000-0000-1111-11111111",
  },
]

class CustomPackage extends Component {

  render() {

    // https://www.cnblogs.com/senyier/p/7835240.html
    var CallFunName = function (fn, args) {
      var aArr = [];//传入的参数集合
  
      if (args != null && args != "") {
          aArr = args.split(",");
      }
      try {
          fn = eval(fn);
      } catch (e) {
          console.log(e);
          alert(funName + '方法不存在！');
      }
      if (typeof fn === 'function') {
          try {
              fn.apply(this, aArr );//注意此处用apply，而非call
          }
          catch (ex) {
              console.log(ex);
              alert(funName + '变量个数不对');
          }
      }
    }

    function call(functionName, params){
      eval("analytics." + functionName + "()");
    }
    return (
      <Package
        label={COMPONENT_LABEL}
        value={COMPONENT_VALUE}
        navigation={this.props.navigation}
      >
        
        <Card html={[COMPONENT_VALUE, "自定义事件"]} codeHeight={10}>
          <View>
            <TouchableHighlight><Text>没有实现点击的 Text</Text></TouchableHighlight>
            <View><Button sensorsdataparams={{"testKert":"sdfas"}} title="自定义埋点 ~ 一期功能" onPress={()=>{
              var set11 = new Set([1, 2, 3]); // 含1, 2, 3
              analytics.track('testTrack', {testKey:set11});

            }} /></View>
            <View><Button title="手动埋点事件 ~ 一期功能" onPress={()=> analytics.trackViewScreen('testViewScreen', {"$url":"testViewScreenValue"})} /></View>
            <View><Button title="手动渠道事件 ~ 一期功能" onPress={()=> analytics.trackChannelEvent('testChannelEvent',{testChannelkey:'testChannelValue'})} /></View>
            <View><Button title="设置事件回调 ~ 三期功能 - 缺失" onPress={()=> analytics.setTrackEventCallback('testChannelEvent',{testChannelkey:'testChannelValue'})} /></View>
          </View>
        </Card>
        <Card html={[COMPONENT_VALUE, "公共属性"]} codeHeight={10}>
          <View>
            <View><Button title="注册静态公共属性 ~ 一期功能" onPress={()=> analytics.registerSuperProperties({testKey1:'testValue1',testKey2:'testValue2'})} /></View>
            <View><Button title="取消静态公共属性 ~ 一期功能" onPress={()=> analytics.unregisterSuperProperty('testKey2')} /></View>
            <View><Button title="清除静态公共属性 ~ 一期功能" onPress={()=> analytics.clearSuperProperties()}/></View>
            <View><Button title="获取当前静态公共属性 ~ 三期功能" onPress={()=> analytics.getSuperPropertiesPromise().then((value) => {Alert.alert(value); })} /></View>
            <View><Button title="获取预置属性 ~ 三期功能" onPress={()=> analytics.getPresetPropertiesPromise().then((value) => { Alert.alert(value); })}/></View>
          </View>
        </Card>
        <Card html={[COMPONENT_VALUE, "Profile 操作"]} codeHeight={10}>
          <View>
            <View><Button title="profileSet ~ 一期功能" onPress={()=> analytics.profileSet({name:"caojiang"})} /></View>
            <View><Button title="profileSetOnce ~ 一期功能" onPress={()=> analytics.profileSetOnce({age: 11})} /></View>
            <View><Button title="profileIncrement ~ 一期功能" onPress={()=> analytics.profileIncrement('age', 1)} /></View>
            <View><Button title="profileAppend ~ 一期功能" onPress={()=> analytics.profileAppend('array', ["1"])} /></View>
            <View><Button title="profileUnset ~ 一期功能" onPress={()=> analytics.profileUnset('name')} /></View>
            <View><Button title="profileDelete ~ 一期功能" onPress={()=> analytics.profileDelete()} /></View>
            <View><Button title="设置 PushId ~ 三期功能" onPress={()=> analytics.profilePushId('jpush', 'j123123123')} /></View>
            <View><Button title="删除 PushId ~ 三期功能" onPress={()=> analytics.profileUnsetPushId('jpush')} /></View>
          </View>
        </Card>
        <Card html={[COMPONENT_VALUE, "Item 操作"]} codeHeight={10}>
          <View>
            <View><Button title="itemSet ~ 三期功能" onPress={()=> analytics.itemSet('itemKey', 'itemValue', {'testKey':'testValue'})} /></View>
            <View><Button title="itemDelete ~ 三期功能" onPress={()=> analytics.itemDelete('itemKey', 'itemValue')} /></View>
          </View>
        </Card>
        <Card html={[COMPONENT_VALUE, "ID 管理"]} codeHeight={10}>
          <View>
            <View><Button title="设置匿名 ID ~ 一期功能" onPress={()=>{ analytics.identify('0000-0000-1111-11111111'); }} /></View>
            <View><Button title="登录 ~ 一期功能" onPress={()=> analytics.login('123123123')} /></View>
            <View><Button title="登出 ~ 一期功能" onPress={()=> analytics.logout('')} /></View>
            <View><Button title="获取 Distinct Id ~ 一期功能" onPress={()=> analytics.getDistinctId(success, failed)} /></View>
            <View><Button title="通过 Promise 获取 Distinct Id ~ 一期功能" onPress={()=> analytics.getDistinctIdPromise().then((value) => {Alert.alert(value); })} /></View>
            <View><Button title="通过 Promise 获取匿名 Id ~ 一期功能" onPress={()=> analytics.getAnonymousIdPromise().then((value) => { Alert.alert(value); })} /></View>
            <View><Button title="通过 Promise 获取 Login Id ~ 三期功能" onPress={()=> analytics.getLoginIdPromise().then((value) => { Alert.alert(value); })} /></View>
            <View><Button title="重置匿名 Id ~ 三期功能" onPress={()=> analytics.resetAnonymousId()} /></View>
          </View>
        </Card>
        <Card html={[COMPONENT_VALUE, "事件计时"]} codeHeight={10}>
          <View>
            <View><Button title="开始自定义埋点事件 ~ 一期功能" onPress={()=> analytics.trackTimerStart('testTimer')} /></View>
            <View><Button title="停止自定义埋点事件 ~ 一期功能" onPress={()=> analytics.trackTimerEnd('testTimer', {})} /></View>
            <View><Button title="暂停事件计时 ~ 三期功能" onPress={()=> analytics. trackTimerPause("testTimer")} /></View>
            <View><Button title="恢复事件计时  ~ 三期功能" onPress={()=> analytics. trackTimerResume("testTimer")} /></View>
            <View><Button title="清除所有埋点计时 ~ 一期功能" onPress={()=> analytics.clearTrackTimer()} /></View>
          </View>
        </Card>
        <Card html={[COMPONENT_VALUE, "通用操作"]} codeHeight={10}>
          <View>
            <View><Button title="删除所有数据 ~ 一期功能" onPress={()=> analytics.deleteAll()} /></View>
            <View><Button title="激活事件 ~ 一期功能" onPress={()=> analytics.trackInstallation('AppInstall',{testAppKey:"testAppValue"})} /></View>
            <View><Button title="发送数据 ~ 一期功能" onPress={()=> analytics.flush()} /></View>
            <View><Button title="设置数据接收地址 ~ 三期功能" onPress={()=> analytics.setServerUrl('https://newsensorsdata.baidu.com')} /></View>
            <View><Button title="设置发送网络策略 ~ 三期功能" onPress={()=> analytics.setFlushNetworkPolicy(8)} /></View>
            <View><Button title="是否开启全埋点 ~ 三期功能" onPress={()=> analytics.isAutoTrackEnabledPromise().then((value) => { Alert.alert(value); })} /></View>
            <View><Button title="是否开启可视化全埋点 ~ 三期功能" onPress={()=> analytics.isVisualizedAutoTrackEnabledPromise().then((value) => { Alert.alert(value); })} /></View>
            <View><Button title="是否开启热力图埋点 ~ 三期功能" onPress={()=> analytics.isHeatMapEnabledPromise().then((value) => { Alert.alert(value); })} /></View>
          </View>
        </Card>
        <Card html={[COMPONENT_VALUE, "Android 方法空实现"]} codeHeight={10}>
          <View>
            <View><Button title="设置数据接收地址 ~ 三期功能" onPress={()=> analytics.setSessionIntervalTime(123)} /></View>
            <View><Button title="设置发送网络策略 ~ 三期功能" onPress={()=> analytics.enableNetworkRequest(true)} /></View>
            <View><Button title="是否开启全埋点 ~ 三期功能" onPress={()=> analytics.getSessionIntervalTimePromise().then((value) => { Alert.alert(value); })} /></View>
            <View><Button title="是否开启全埋点 ~ 三期功能" onPress={()=> analytics.isNetworkRequestEnablePromise().then((value) => { Alert.alert(value); })} /></View>
            <View><Button title="TrackAppInstall ~ 四期功能" onPress={()=> analytics.trackAppInstall({testAppKey:"testAppValue"})} /></View>
          </View>
        </Card>
      </Package>
    );
  }
}

export default CustomPackage;
