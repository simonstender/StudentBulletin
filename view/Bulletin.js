import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image, FlatList} from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


export default class Bulletin extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Bulletin",
      headerLeft: <TouchableOpacity
      onPress={() => navigation.openDrawer()}>
      <Image
      style={{ height: 90, width: 90, paddingLeft: 30 }}
      source={require("../resources/menu-512.png")}
      />
      </TouchableOpacity>,
      headerRight: <TouchableOpacity
      onPress={() => navigation.navigate("SettingsScreen")}>
      <Image
      style={{ height: 40, width: 40, paddingRight: 30, marginLeft: 20, left: -20 }}
      source={require("../resources/setting-512.png")}
      />
      </TouchableOpacity>
    };
  }

  constructor(props){
    super(props);
    this._isMounted = false;
    this.state = {
      profile: {name: "Simon Stender"/*this.props.navigation.state.params.data.name*/, id: this.props.navigation.state.params.data.id, email: this.props.navigation.state.params.data.email, school: "BTH"},
      isFetching: false
    }
  }

  onRefresh = () => {
    //this.setState({profile: {name: this.props.navigation.state.params.data.name, id: this.props.navigation.state.params.data.id, email: this.props.navigation.state.params.data.email, school: "bth"}})
  }

  componenDidMount(){
    this._isMounted = true;
  }

  componenDidUnmount(){
    this._isMounted = false;
  }

  fetchDB(){
    fetch("http://localhost:8529/_db/StudentBulletinDB/init/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _key: this.state.profile.id,
        name: this.state.profile.name,
        email: this.state.profile.email,
        school: this.state.profile.school
      })
    });
  }

  getDB(){
    fetch("http://localhost:8529/_db/StudentBulletinDB/init/users", {
      method: "GET"
      })
      .then((response) => response.json())
      .then((response) => {
        alert(response);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
        style={styles.button}
        title="Check information"
        onPress={() => this.getDB()}
        >
        <Text style={styles.loginText}>Log in yo</Text>
        </Button>
      <View style={styles.bottomContainer}>
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
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#7DF0E8",
    height: 40,
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
    color: "#000000",
    fontSize: 18,
  }
});
