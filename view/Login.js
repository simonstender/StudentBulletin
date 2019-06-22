import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager, Profile } from 'react-native-fbsdk';

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
      loggedIn: false,
      name: "",
      id: "",
      email: "",
    }
  }

  componenDidMount(){
    this._isMounted = true;
    console.log("BAJS");
  }

  componenDidUnmount(){
    LoginManager.logOut();
    this._isMounted = false;
  }

  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      this.state.name = json.name
      this.state.id = json.id
      this.state.email = json.email
      this.state.loggedIn = true
      this.props.navigation.navigate("BulletinScreen", { data: {name: this.state.name, id: this.state.id, email: this.state.email}});
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Student Bulletin</Text>
          <LoginButton
            style={styles.loginButton}
            publishPermissions={["publish_actions"]}
            readPermissions={["id","name","email"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("Login failed with error: " + error.message);
                } else if (result.isCancelled) {
                  alert("Login was cancelled");
                } else {
                  AccessToken.getCurrentAccessToken().then((data) => {
                    const { accessToken } = data
                    this.initUser(accessToken)
                  })
                }
              }
            }
            onLogoutFinished={() => alert("User logged out")}/>
            <Button
            style={styles.button}
            title="Switch"
            onPress={() => {this.props.navigation.navigate("BulletinScreen", { data: {name: this.state.name, id: this.state.id, email: this.state.email}})}}
            >
            </Button>
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
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 28,
    top: 60,
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    color: "#7DF0E8",
    fontSize: 24,
    bottom: 150
  }
});
