import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

type Props = {};
export default class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: null,
      drawerLockMode: "locked-closed",
      gesturesEnabled: false,
      headerStyle: {
        backgroundColor: "#282C34",
        borderBottomWidth: 0,
        elevation: 0
      }
    };
  };

  constructor(props){
    super(props);
    this._isMounted = false;
    this.state = {

    }
  }

  componenDidMount(){
    this._isMounted = true;
  }

  componenDidUnmount(){
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282C34',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
