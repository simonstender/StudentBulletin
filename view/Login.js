import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager, Profile } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
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
    fetch("http://90.224.173.179:8529/_db/StudentBulletinDB/login/users", {
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
    .then(this.props.navigation.navigate("Courses", { data: {name: name, id: id, email: email, school: school}}))
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
      fetch("http://90.224.173.179:8529/_db/StudentBulletinDB/login/users/"+id, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
          if (JSON.stringify(data.code) === "404") {
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
            this.props.navigation.navigate("Courses", { data: {name: data.name, id: data.id, email: data.email, school: data.school}});
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
        <Icon style={styles.icon} name="calendar" size={60} color="#7DF0E8" />
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
    bottom: 150,
  },
  icon: {
    bottom: 100,
    position: "relative"
  }
});
