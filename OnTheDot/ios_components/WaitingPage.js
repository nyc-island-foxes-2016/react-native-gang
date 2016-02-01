'use strict';

import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var REQUEST_URL = 'http://localhost:3000'
var GET_CURRENT_GAME = '/games/'
var GET_IF_JOINED = '/joined'

//destroy route to close game board and return to home - use swap to change nav to main page

class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  swap() {
    this.props.navigator.replace({
      id: 'MainPage'
    });
  }

  componentDidMount() {
    this.getPlayer2Joined();
  }

  getPlayer2Joined() {
    fetch(REQUEST_URL + GET_CURRENT_GAME + this.props.gameId + GET_IF_JOINED)
      .then((response) => response.json())
      .then((responseText) => {
        console.log(responseText);
        if(responseText.result === "Yes"){
          this.swap();
        }
        else {
          setTimeout(() => {
            this.getPlayer2Joined();
            }, 500);
        }
      });
    }


  render() {

    return (
      <View style={styles.container}>
        <Text>
          Waiting....
        </Text>
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    padding: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

module.exports = WelcomePage;
