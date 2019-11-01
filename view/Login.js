import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, ImageBackground} from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager, Profile, } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
  constructor(props){
    super(props);
    this._isMounted = false;
    this.state = {
      loggedIn: false,
      name: "",
      id: "",
      school: "",
    }
  }

  componentDidMount(){
    this._isMounted = true;
    AccessToken.getCurrentAccessToken().then((data) => {
      if (data !== null) {
        const { accessToken } = data
        this.initUser(accessToken);
      }
    })
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  createUser(id, name, school){
    fetch("http://80.78.219.10:8529/_db/StudentBulletinDB/login/users", {
      method: "POST",
      headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       _key: id,
       name: name,
       school: school
     })
    })
    .then(this.props.navigation.navigate("Courses", {data:{name:name,id:id,school:school}}))
  }

  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=name,id&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      const name = json.name
      const id = json.id
      var school = "";
      this.state.loggedIn = true
      fetch("http://80.78.219.10:8529/_db/StudentBulletinDB/login/users/"+id, {
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
                {text: 'Blekinge Tekniska Högskola', onPress: () => (school = "BTH", this.createUser(id, name, school))},
                {text: 'Chalmers', onPress: () => (school = "Chalmers", this.createUser(id, name, school))},
              ],
              {cancelable: false},
            );
          } else {
            this.props.navigation.navigate("Courses", {data:{name:data.name,id:data.id,school:data.school}});
          }
        })
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  render() {
    return (
      <ImageBackground source={require("../resources/Background.jpg")} style={styles.backgroundPicture}>
        <Text style={styles.text}>Student Bulletin</Text>
          <LoginButton
            style={styles.loginButton}
            publishPermissions={["publish_actions"]}
            readPermissions={["public_profile"]}
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
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundPicture: {
    flex: 1,
    //resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
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
    color: "black",
    textShadowColor: "white",
    textDecorationColor: "white",
    textShadowRadius: 8,
    fontSize: 32,
    bottom: 150,
  },
  icon: {
    bottom: 100,
    position: "relative"
  },
});
