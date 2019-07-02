import React, {Component} from 'react';
import { TouchableOpacity, Image, AppRegistry, StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from "./view/Login"
import Bulletin from "./view/Bulletin"
import Courses from "./view/Courses"
import Events from "./view/Events"
import SideMenu from "./navigators/SideMenu"

const BulletinTabNavigator = createBottomTabNavigator({
  Courses,
  Events
},{
  navigationOptions:({navigation})=>{
    const {routeName} = navigation.state.routes[navigation.state.index]
    return{
      headerTitle:routeName,
    }
  }
})

const AppStackNavigator = createStackNavigator({
  BulletinTabNavigator:BulletinTabNavigator,
  LoginScreen: Login,
  BulletinScreen: Bulletin,
  CoursesScreen: Courses,
  EventsScreen: Events,
},{
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerLeft: <TouchableOpacity
      onPress={() => navigation.openDrawer()}>
      <Icon style={styles.icon} name="user-circle" size={30} color="#7DF0E8" />
      </TouchableOpacity>,
      headerStyle: {
        backgroundColor: '#ADADAD',
        height: 60,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        flex: 1,
        fontSize: 24,
        textAlign: "center",
        alignSelf: "center",
        position: "absolute"
      },
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  Stäng: AppStackNavigator,
},
{
  drawerLockMode: "locked-closed",
  drawerBackgroundColor: "#ADADAD",
  contentOptions:{
    labelStyle: {
      fontSize: 24,
      color: '#FFFFFF'},
    },
    contentComponent: SideMenu,
})

const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen: Login,
  BulletinScreen: AppDrawerNavigator,
  CoursesScreen: Courses,
  EventsScreen: Events
})

const App = createAppContainer(AppSwitchNavigator);
export default App;
AppRegistry.registerComponent("App", () => App);

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 12,
  }
});
