import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image, FlatList} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class Settings extends Component {
  constructor(props){
    super(props);
    this._isMounted = false;
    this.state = {
      profile: {name: this.props.navigation.state.params.data.name,
                id: this.props.navigation.state.params.data.id,
                email: this.props.navigation.state.params.data.email,
                school: this.props.navigation.state.params.data.school},
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
      <View style={styles.container}>
        <Text style={styles.itemText}>Settings Screen</Text>
        <Button
        title="Go back"
        onPress={() => this.props.navigation.navigate("Courses",{data:{id:this.state.profile.id,name:this.state.profile.name,email:this.state.profile.email,school:this.state.profile.school}})}
        />
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
  },
  icon: {
    paddingLeft: 12,
  }
});
