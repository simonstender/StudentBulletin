import React, {Component} from 'react';
import { TouchableOpacity, Image, AppRegistry, StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from "./view/Login"
import Bulletin from "./view/Bulletin"
import Courses from "./view/Courses"
import Events from "./view/Events"
import SideMenu from "./navigators/SideMenu"
import Settings from "./view/Settings"

const SettingStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => {
      return {
        header: null,
      }
    }
  }
})

const CourseStack = createStackNavigator({
  Courses: {
    screen: Courses,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: "Courses",
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
  }
})

const EventStack = createStackNavigator({
  Events: {
    screen: Events,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: "Events",
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
  }
})

const BulletinTabNavigator = createBottomTabNavigator({
  Courses: {
    screen: CourseStack,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: <Icon name="graduation-cap" size={30} color="#7DF0E8" />
      }
    }
  },
  Events: {
    screen: EventStack,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: <Icon name="calendar" size={30} color="#7DF0E8" />
      }
    }
  }
},{
  navigationOptions:({navigation})=>{
    return{
      header: null,
    }
  },
  tabBarOptions: {
  activeTintColor: '#e91e63',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: "#ADADAD",
    fontSize: 24,
    textAlign: "center"
  },
  showLabel: false,
}
})

const AppStackNavigator = createStackNavigator({
  BulletinTabNavigator:BulletinTabNavigator,
  SettingScreen: {
    screen: SettingStack,
    navigationOptions: ({navigation}) => {
      return  {
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
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  AppStackNavigator: AppStackNavigator,
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
})

const App = createAppContainer(AppSwitchNavigator);
export default App;
AppRegistry.registerComponent("App", () => App);

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 12,
  }
});
