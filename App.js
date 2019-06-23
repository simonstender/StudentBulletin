import React, {Component} from 'react';
import { TouchableOpacity, Image, AppRegistry, StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';

import Login from "./view/Login"
import Bulletin from "./view/Bulletin"

const AppStackNavigator = createStackNavigator({
  LoginScreen: Login,
  BulletinScreen: Bulletin
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
  Stäng: AppStackNavigator,
  Bulletin: Bulletin,
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

const App = createAppContainer(AppDrawerNavigator);
export default App;
AppRegistry.registerComponent("App", () => App);
