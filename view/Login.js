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
      result: "",
      name: "",
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

  async loginFacebook(){
    try {
      let result = await LoginManager.logInWithReadPermissions(['public_profile'])
      if (result.isCancelled) {
        alert('Login was cancelled');
      } else {
        alert("Login was successful with permissions: "
          + result.grantedPermissions.toString());
      }
    } catch (e) {
      alert('Login failed with error:'+e)
    }
  }

  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      this.state.name = json.name
      user.id = json.id
      user.user_friends = json.friends
      this.state.email = json.email
      user.username = json.name
      user.loading = false
      user.loggedIn = true
      user.avatar = setAvatar(json.id)
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
        style={styles.button}
        title="Log in with facebook"
        onPress={() => alert("Name:"+this.state.name+"\nEmail:"+this.state.email)}
        >
        <Text style={styles.loginText}>Log in yo</Text>
        </Button>
        <LoginButton
          publishPermissions={["publish_actions"]}
          readPermissions={["public_profile"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
                AccessToken.getCurrentAccessToken().then((data) => {
                  const { accessToken } = data
                  this.initUser(accessToken)
                })
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
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
  button: {
    backgroundColor: "white",
    width: 25,
    height: 25,
  },
  loginText: {

  }
});
