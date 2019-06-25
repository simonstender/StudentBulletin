import React, {Component} from 'react';
import { TouchableOpacity, Image, AppRegistry, StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';

import Login from "./view/Login"
import Bulletin from "./view/Bulletin"
import Courses from "./view/Courses"
import Events from "./view/Events"

const BulletinTabNavigator = createBottomTabNavigator({
  Bulletin,
  Courses,
  Events
},{
  navigationOptions:({navigation})=>{
    const {routeName} = navigation.state.routes[navigation.state.index]
    return{
      headerTitle:routeName
    }
  }
})

const BulletinStackNavigator = createStackNavigator({
  BulletinTabNavigator:BulletinTabNavigator
},{
  defaultNavigationOptions: ({navigation}) =>{
    return {
      headerLeft: <TouchableOpacity
      onPress={() => navigation.openDrawer()}>
      <Image
      style={{ height: 90, width: 90, paddingLeft: 30 }}
      source={require("./resources/menu-512.png")}
      />
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
        alignSelf: "center"
       },
        headerTintColor: '#FFFFFF',
        drawerLockMode: "locked-closed",
        gesturesEnabled: false,
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  BulletinScreen:{screen:BulletinStackNavigator}
})

AppSwitchNavigator = createSwitchNavigator({
  LoginScreen:{screen:Login},
  BulletinScreen:{screen:AppDrawerNavigator}
})



const App = createAppContainer(AppSwitchNavigator);
export default App;
AppRegistry.registerComponent("App", () => App);


/*
const TopTabNavigator = createMaterialTopTabNavigator({
  LoginScreen: Login,
  BulletinScreen: Bulletin,
},
{
  tabBarOptions: {
  }
});

const AppStackNavigator = createStackNavigator({
  TopTabNavigator: TopTabNavigator
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#ADADAD',
      height: 60,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      flex: 1,
      fontSize: 24,
      textAlign: "center",
      alignSelf: "center"
     },
      headerTintColor: '#FFFFFF',
      drawerLockMode: "locked-closed",
      gesturesEnabled: false,
    },
  });

// Menu navigation
const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: AppStackNavigator
  }
},
{
  drawerLockMode: "locked-closed",
  drawerBackgroundColor: "#ADADAD",
  contentOptions:{
    labelStyle: {
      fontSize: 24,
      color: '#FFFFFF'},
    }
  });
*/
