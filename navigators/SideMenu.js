import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image, FlatList} from 'react-native';
import Dimensions from 'Dimensions';
import { AccessToken } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class SideMenu extends Component {
  constructor(props){
    super(props);
    this._isMounted = false;
    this.state = {
      profile: {},
    }
  }

  componentDidMount(){
    this._isMounted = true;
    AccessToken.getCurrentAccessToken().then((data) => {
      const { accessToken } = data
      this.fetchUser(accessToken);
    })
  }

  fetchUser(token){
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((response) => {
      fetch("http://83.191.175.55:8529/_db/StudentBulletinDB/login/users/"+response.id)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          profile:{id: response._key,
                   name: response.name,
                   school: response.school}
        })
      })
      .catch(() => {
        reject("ERROR GETTING DATA FROM DATABASE")
      })
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  componenDidUnmount(){
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity
      style={styles.arrowIcon}
      onPress={() => this.props.navigation.closeDrawer()}>
      <Icon name="arrow-left" size={40} color="#7DF0E8" />
      </TouchableOpacity>
        <Text style={styles.itemText}>SideBar</Text>
        <View style={styles.bottomContainer}>
        <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => this.props.navigation.navigate("SettingScreen", {data:{id:this.state.profile.id,name:this.state.profile.name,school:this.state.profile.school}})}>
        <Icon name="cog" size={40} color="black" />
        </TouchableOpacity>
          <Text style={styles.itemText}>{this.state.profile.name}({this.state.profile.school})</Text>
          </View>
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
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    flexDirection: "row-reverse",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#7DF0E8",
    height: 40,
  },
  arrowIcon: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 530,
    left: 242
  },
  settingsIcon: {
    position: "absolute",
    left: 242
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  button: {
    backgroundColor: "white",
    width: 25,
    height: 25,
  },
  itemText: {
    color: "black",
    fontSize: 18,
  },
});
