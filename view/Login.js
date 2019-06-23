import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';
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
      school: "",
    }
  }

  componenDidMount(){
    this._isMounted = true;
  }

  componenDidUnmount(){
    this._isMounted = false;
  }

  createUser(id, name, email, school){
    alert(id+name+email+school)
    fetch("http://10.0.2.2:8529/_db/StudentBulletinDB/login/users", {
      method: "POST",
      headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       _key: id,
       name: name,
       email: email,
       school: school
     })
    })
    .then(this.props.navigation.navigate("BulletinScreen", { data: {name: name, id: id, email: email, school: school}}))
  }
  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      const name = json.name
      const id = json.id
      const email = json.email
      var school = "";
      this.state.loggedIn = true
      fetch("http://10.0.2.2:8529/_db/StudentBulletinDB/login/users/"+id, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        })
        .then((response) => {
          if (JSON.stringify(response.status) === "404") {
            Alert.alert(
              'First time on the app',
              'Choose which school you go to',
              [
                {text: 'Blekinge Tekniska Högskola', onPress: () => (school = "BTH", this.createUser(id, name, email, school))},
                {text: 'Chalmers', onPress: () => (school = "Chalmers", this.createUser(id, name, email, school))},
              ],
              {cancelable: false},
            );
          } else {
            alert(JSON.stringify(response));
            //this.props.navigation.navigate("BulletinScreen", { data: {name: this.state.name, id: this.state.id, email: this.state.email}});
          }
        })
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#282C34',
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
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
  },
  choice: {
    top: 50,
  }
});
