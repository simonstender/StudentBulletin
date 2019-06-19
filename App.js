import React, {Component} from 'react';
import { TouchableOpacity, Image, AppRegistry, StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

import Login from "./view/Login"

const AppStackNavigator = createStackNavigator({
  LoginScreen: Login
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#ADADAD',
      height: 80,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontSize: 32,
      paddingLeft: 30 },
      headerTintColor: '#FFFFFF',
      drawerLockMode: "locked-closed",
      gesturesEnabled: false,
    },
  }
);

// Menu navigation
const AppDrawerNavigator = createDrawerNavigator({
  Stäng: AppStackNavigator
},
{
  drawerLockMode: "locked-closed",
  drawerBackgroundColor: "#ADADAD",
  contentOptions:{
    labelStyle: {
      fontSize: 24,
      color: '#FFFFFF'},
    }

  }
);

const App = createAppContainer(AppDrawerNavigator);

export default App;

AppRegistry.registerComponent("App", () => App);

