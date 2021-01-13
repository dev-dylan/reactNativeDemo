import React, { Component } from 'react';
import { View } from 'react-native';
import Card from '../../widget/card';
import Package from '../../widget/package';
import { WebView } from 'react-native-webview';


const COMPONENT_LABEL = '用于访问一个网页';
const COMPONENT_VALUE = 'WebView';
const OPERATE_LIST = [
  {
    label: 'RN Community',
    value: 'https://github.com/react-native-community'
  },
  {
    label: 'React-Native',
    value: 'https://github.com/facebook/react-native'
  },
  {
    label: 'Ant Design',
    value: 'https://ant.design/docs/react/introduce-cn'
  },
  {
    label: 'React',
    value: 'https://reactjs.org/'
  }
];

class WebViewPackage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // url: 'https://jiangwenwensa.github.io/app-h5-test/index5.html'
      url: require('./newH5.html')
    };
  }

  previewDemoOne = () => {
    return (
      <View
        style={{ width: 360, height: 300, paddingLeft: 20, paddingRight: 20 }}
      >
        <WebView
          ref='WebView'
          useWebKit
          originWhitelist={['*']}
          startInLoadingState={true}
          javaScriptEnabled={true}
          automaticallyAdjustContentInsets={true}
          source={{ uri: 'http://psyer.gitee.io/src/index.html' }}
        />
      </View>
    );
  };
/*
  previewDemoOne = () => {
    return (
      <View
        style={{ width: 360, height: 300, paddingLeft: 20, paddingRight: 20 }}
      >
        <WebView
          ref='WebView'
          useWebKit
          originWhitelist={['*']}
          startInLoadingState={true}
          javaScriptEnabled={true}
          automaticallyAdjustContentInsets={true}
          source={{ uri: './newH5.html' }}
        />
      </View>
    );
  };
*/

  onOperate = item => {
    this.setState({ url: item.value });
  };

  render() {
    return (
      <Package
        label={COMPONENT_LABEL}
        value={COMPONENT_VALUE}
        navigation={this.props.navigation}
      >
        {/** demo - 1 */}
        <Card
          html={COMPONENT_VALUE}
          codeHeight={944}
          operateList={OPERATE_LIST}
          onOperate={this.onOperate}
        >
          {this.previewDemoOne()}
        </Card>
      </Package>
    );
  }
}

export default WebViewPackage;
