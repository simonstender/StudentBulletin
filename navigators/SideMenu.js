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
      fetch("http://192.168.1.25:8529/_db/StudentBulletinDB/login/users/"+response.id)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          profile:{id: response._key,
                   name: response.name,
                   email: response.email,
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
      <View style={styles.topContainer}>
        <TouchableOpacity
        onPress={() => this.props.navigation.closeDrawer()}>
        <Icon style={styles.arrowIcon} name="arrow-left" size={50} color="#7DF0E8" />
        </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.itemText}>SideBar</Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.itemText}>{this.state.profile.name}({this.state.profile.school})</Text>
          </View>
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
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#7DF0E8",
    height: 40,
  },
  topContainer: {
    flex: 2,
    backgroundColor: "#282C34",
  },
  arrowIcon: {
    position: "relative",
    left: 230
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
