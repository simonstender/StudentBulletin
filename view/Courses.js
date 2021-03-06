import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image, FlatList, ImageBackground} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class Courses extends Component {
  constructor(props){
    super(props);
    this._isMounted = false;
    this.state = {
      profile: {name: this.props.navigation.state.params.data.name,
                id: this.props.navigation.state.params.data.id,
                school: this.props.navigation.state.params.data.school},
      isFetching: false,
      responseMsg: "",
    }
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componenDidUnmount(){
    this._isMounted = false;
  }

  render() {
    return (
      <ImageBackground source={require("../resources/GrayBackground.jpg")} style={styles.backgroundPicture}>

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
  },
  icon: {
    paddingLeft: 12,
  }
});
