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
      profile: {name: this.props.navigation.state.params.data.name, id: this.props.navigation.state.params.data.id, email: this.props.navigation.state.params.data.email},
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

  render() {
    return (
      <View style={styles.container}>
      <Button
      style={styles.button}
      title="Check information"
      onPress={() => alert("Profile:"+this.state.profile.name)}
      >
      <Text style={styles.loginText}>Log in yo</Text>
      </Button>
      <Text style={styles.itemText}>{this.state.profile.name}, {this.state.profile.email}</Text>
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
  profile: {
    width: DEVICE_WIDTH - 40,
    bottom: 50,
    position: "absolute",
    borderColor: "#FFFFFF",
    borderRightWidth: 5,
    left: 95,
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: 18,
  }
});
