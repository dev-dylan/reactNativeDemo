import React, { Component } from 'react';
import { Button, View, Alert,Text } from 'react-native';
import Card from '../../widget/card';
import Package from '../../widget/package';
import { NativeModules } from 'react-native';

const RNSensorsAnalyticsModule = NativeModules.RNSensorsAnalyticsModule;
const RNSensorsDataModule = NativeModules.RNSensorsDataModule;

const COMPONENT_LABEL = '跨平台的按钮组件';
const COMPONENT_VALUE = 'Button';
const BUTTON_DEFAULT_LIST = [
  {
    label: '默认按钮'
  },
  {
    label: '禁用按钮',
    color: '#e6a23c',
    disabled: true
  },
  {
    label: '警告按钮',
    color: '#e6a23c'
  },
  {
    label: '危险按钮',
    color: '#f56c6c'
  }
];
const BUTTON_SIZE_LIST = [
  {
    label: '大尺寸默认按钮',
    width: 150
  },
  {
    label: '大尺寸禁用按钮',
    color: '#e6a23c',
    width: 150,
    disabled: true
  }
];

class ButtonPackage extends Component {

  onPressLearnMore = (item) => {
    console.log(item);
  };

  previewDemoOne = (list) => {

    return (
      <View style={{ flexDirection: "row" }}>
        {list.map((item) => {
          return (
            <View style={{ width: item.width, marginLeft: 3 }} key={item.label}>
              <Button
                onPress={() => {
                  this.onPressLearnMore(item);
                }}
                title={item.label}
                color={item.color}
                disabled={item.disabled}
              />
            </View>
          );
        })}
        
      </View>
      
    );
  };

  render() {
    return (
      <Package
        label={COMPONENT_LABEL}
        value={COMPONENT_VALUE}
        navigation={this.props.navigation}
      >
        {/** demo - 1 */}
        <Card html={[COMPONENT_VALUE, "FIRST"]} codeHeight={636}>
          {this.previewDemoOne(BUTTON_DEFAULT_LIST)}
        </Card>

        {/** demo - 2 */}
        <Card html={[COMPONENT_VALUE, "SECOND"]} codeHeight={620}>
          {this.previewDemoOne(BUTTON_SIZE_LIST)}
        </Card>
        <Button title="identify" style={marginBottom=20} onPress={()=>
              analytics.identify('0000-0000-1111-11111111')}>
            <Text>identify</Text>
          </Button>
          <Button title="registerSuperProperties" style={marginBottom=20} onPress={()=>
              analytics.registerSuperProperties({testKey1:'testValue1',testKey2:'testValue2'})}>
            <Text>registerSuperProperties</Text>
          </Button>
          <Button title="unregisterSuperProperty" style={marginBottom=20} onPress={()=>
              analytics.unregisterSuperProperty('testKey2')}>
            <Text>unregisterSuperProperty</Text>
          </Button>
          <Button title="clearSuperProperties" style={marginBottom=20} onPress={()=>
              analytics.clearSuperProperties()}>
            <Text>clearSuperProperties</Text>
          </Button>
          <Button title="deleteAll" style={marginBottom=20} onPress={()=>
              analytics.deleteAll()}>
            <Text>deleteAll</Text>
          </Button>
          <Button title="login" style={marginBottom=20} onPress={()=>
              analytics.login('123123123')}>
            <Text>login</Text>
          </Button>
          <Button title="logout" style={marginBottom=20} onPress={()=>
              analytics.logout('')}>
            <Text>logout</Text>
          </Button>
          <Button title="profileSet" style={marginBottom=20} onPress={()=>
              analytics.profileSet({name:"caojiang"})}>
            <Text>profileSet</Text>
          </Button>
          <Button title="profileSetOnce" style={marginBottom=20} onPress={()=>
              analytics.profileSetOnce({age: 11})}>
            <Text>profileSetOnce</Text>
          </Button>
          <Button title="profileIncrement" style={marginBottom=20} onPress={()=>
              analytics.profileIncrement('age', 1)}>
            <Text>profileIncrement</Text>
          </Button>
          <Button title="profileAppend" style={marginBottom=20} onPress={()=>
              analytics.profileAppend('array', ["1"])}>
            <Text>profileAppend</Text>
          </Button>
          <Button title="profileUnset" style={marginBottom=20} onPress={()=>
            analytics.profileUnset('name')}>
          <Text>profileUnset</Text>
          </Button>
          <Button title="profileDelete" style={marginBottom=20} onPress={()=>
            analytics.profileDelete()}>
          <Text>profileDelete</Text>
          </Button>
          <Button title="track" style={marginBottom=20} onPress={()=>
              analytics.track('testTrack', {testKey:"testValue"})}>
            <Text>track</Text>
          </Button>
          <Button title="trackTimerStart" style={marginBottom=20} onPress={()=>
              analytics.trackTimerStart('testTimer')}>
            <Text>trackTimerStart</Text>
          </Button>
          <Button title="trackTimerEnd" style={marginBottom=20} onPress={()=>
              analytics.trackTimerEnd('testTimer')}>
            <Text>trackTimerEnd</Text>
          </Button>
          <Button title="clearTrackTimer" style={marginBottom=20} onPress={()=>
              analytics.clearTrackTimer()}>
            <Text>clearTrackTimer</Text>
          </Button>
          <Button title="trackInstallation" style={marginBottom=20} onPress={()=>
              analytics.trackInstallation('AppInstall',{testAppKey:"testAppValue"})}>
            <Text>trackInstallation</Text>
          </Button>
          <Button title="trackViewScreen" style={marginBottom=20} onPress={()=>
              analytics.trackViewScreen('testViewScreen', {testViewScreenKey:"testViewScreenValue"})}>
            <Text>trackViewScreen</Text>
          </Button>
          <Button title="trackChannelEvent" style={marginBottom=20} onPress={()=>
              analytics.trackChannelEvent('testChannelEvent',{testChannelkey:'testChannelValue'})}>
            <Text>trackChannelEvent</Text>
          </Button>
          <Button title="getDistinctId" style={marginBottom=20} onPress={()=>
              analytics.getDistinctId(success, failed)}>
            <Text>getDistinctId</Text>
          </Button>
          <Button title="getDistinctIdPromise" style={marginBottom=20} onPress={()=>
              analytics.getDistinctIdPromise().then((value) => {
                Alert.alert(value);
              })}>
            <Text>getDistinctIdPromise</Text>
          </Button>
          <Button title="getAnonymousIdPromise" style={marginBottom=20} onPress={()=>
              analytics.getAnonymousIdPromise().then((value) => {
                Alert.alert(value);
              })}>
            <Text>getAnonymousIdPromise</Text>
          </Button>
          <Button title="flush" style={marginBottom=20} onPress={()=>
              analytics.flush()}>
            <Text>flush</Text>
          </Button>

          <Button title="RN方法" style={marginBottom=20} onPress={()=> {
              var bestid = RNSensorsAnalyticsModule.getDistinctId();
              Alert.alert(bestid);
          }}>
            <Text>RN方法</Text>
          </Button>
      </Package>
    );
  }
}

export default ButtonPackage;
