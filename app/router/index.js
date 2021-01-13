/**
 * router 层
 */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { routerList } from './list';

const StackNavigatorConfigs = {
  initialRouteName: 'Tab'
};

const AppNavigator = createStackNavigator(routerList, StackNavigatorConfigs);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
