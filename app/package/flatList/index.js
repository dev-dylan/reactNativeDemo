import React, { PureComponent } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Card from '../../widget/card';
import Package from '../../widget/package';
import { getList } from './mock';
import Icon from 'react-native-vector-icons/Entypo';

const COMPONENT_LABEL = '高性能长列表';
const COMPONENT_VALUE = 'FlatList';
const PAGE_SIZE = 5;

class FlatListPackage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      data: [],
      loading: false,
      page: 1
    };
  }

  asyncPullData = async () => {
    try {
      if (this.state.data.length > total) return false;
      this.setState({ loading: true });
      const { list, total } = await getList(this.state.page, PAGE_SIZE);
      const data = this.state.data.concat(list);
      this.setState({ data, total, page: this.state.page + 1 });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  async componentDidMount() {
    await this.asyncPullData();
  }

  _onItemPress = item => {
    console.log(item);
  };

  /**
   * 下拉刷新
   */
  _onRefresh = () => {
    // this.setState({ data: [], total: 0, page: 1 });
    console.log('下拉刷新');
  };

  /**
   * 触底操作
   */
  _onEndReached = () => {
    if (this.state.data.length === this.state.total) return false;
    this.asyncPullData();
  };

  /**
   * 用于避免动态测量内容尺寸的开销
   */
  _getItemLayout = (data, index) => ({
    length: 100,
    offset: 100 * index,
    index
  });

  /**
   * 尾部组件
   */
  _ListFooterComponent = () => {
    const { data, total } = this.state;
    if (data.length < total || this.state.loading) return <View />;
    return (
      <View style={styles.list_footer}>
        <Text style={styles.list_footer_text}>我也是有底线的</Text>
      </View>
    );
  };

  /**
   * 列表为空时渲染该组件
   */
  _ListEmptyComponent = () => {
    if (this.state.loading) return false;
    return (
      <View style={styles.none_wraper}>
        <Text style={styles.none_wraper_text}>暂无数据!</Text>
      </View>
    );
  };

  /**
   * 为给定的 item 生成一个不重复的 key
   */
  _keyExtractor = (item, index) => `${item.id}_${index}`;

  /**
   * 行与行之间的分隔线组件
   */
  _ItemSeparatorComponent = ({ highlighted, leadingItem }) => {
    return (
      // <View style={[styles.separator, highlighted && { color: 'blue' }]} />
      <View />
    );
  };

  /**
   * 从data中挨个取出数据并渲染到列表
   */
  _renderItem = ({ item, index, separators }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={() => {
          this._onItemPress(item);
        }}
      >
        <View style={styles.item_image}>
          <Image
            style={styles.item_image_show}
            source={{ uri: item.owner.avatar_url }}
          />
        </View>
        <View style={styles.item_content}>
          <Text
            style={[styles.item_content_title, { color: '#0366d6' }]}
            numberOfLines={1}
          >
            {item.full_name}
          </Text>
          <Text style={styles.item_content_title} numberOfLines={1}>
            {item.description}
          </Text>
          <View style={styles.item_content_tag}>
            <Text style={styles.item_content_tags}>
              <Icon name='star' style={styles.item_icon} />
              {item.stargazers_count}
            </Text>
            <Text style={styles.item_content_tags}>
              <Icon name='flow-branch' style={styles.item_icon} />
              {item.forks_count}
            </Text>
            <Text style={styles.item_content_tags}>
              <Icon
                name='controller-record'
                style={[styles.item_icon, { color: 'rgb(241, 224, 90)' }]}
              />
              {item.language}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _ref = FlatList => {
    this.FlatList = FlatList;
  };

  _operateRefs = (type, ...params) => {
    if (this.FlatList) {
      this.FlatList[type](...params);
    }
  };

  /**
   * 滚动到底部
   */
  _scrollToEnd = () => {
    this._operateRefs('scrollToEnd');
  };

  /**
   * 将位于指定位置的元素滚动到可视区的指定位置
   * 0 - 1
   */
  _scrollToIndex = (num = 0) => {
    this._operateRefs('scrollToIndex', num);
  };

  previewDemoOne = () => {
    const { loading, data } = this.state; // getItemLayout={this._getItemLayout}
    return (
      <View style={{ height: 360, width: 340, padding: 10 }}>
        <FlatList
          data={data}
          refreshing={loading}
          ref={this._ref}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
          ListEmptyComponent={this._ListEmptyComponent}
          ListFooterComponent={this._ListFooterComponent}
          onEndReachedThreshold={0.4}
          initialNumToRender={1}
          onEndReached={this._onEndReached}
          onRefresh={this._onRefresh}
        />
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
        <Card html={COMPONENT_VALUE} codeHeight={3270}>
          {this.previewDemoOne()}
        </Card>
      </Package>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#999',
    width: 340,
    marginTop: 4
  },

  /** none */
  none_wraper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  none_wraper_text: {
    fontSize: 18,
    color: '#999'
  },

  /** list_footer */
  list_footer: {
    justifyContent: 'center',
    padding: 10
  },
  list_footer_text: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center'
  },

  /** render-item */
  item: {
    width: 320,
    height: 100,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 4,
    borderRadius: 4
  },
  item_image: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4
  },
  item_image_show: {
    width: 48,
    height: 48
  },
  item_content: {
    flex: 1,
    flexDirection: 'column'
  },
  item_content_title: {
    fontSize: 14,
    color: '#222',
    width: 200,
    marginBottom: 14
  },
  item_content_tag: {
    flexDirection: 'row'
  },
  item_content_tags: {
    fontSize: 12,
    color: '#999',
    marginRight: 10,
    alignItems: 'center',
    alignContent: 'center'
  },
  item_icon: {
    color: '#999',
    fontSize: 16
  }
});

export default FlatListPackage;
