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
var POST_NEW_GAME = '/games'

class LoadPage extends Component {
  constructor(props) {
    super(props);
    var timeoutId = setTimeout(() => {
      if (!this.state.rendered) {
        this.swap();
      }
    }, 3000);
    this.state = {
      rendered: false,
      timeoutId: timeoutId
    }
  }

  swap() {
    this.props.navigator.replace({
      id: 'MainPage' });
    clearTimeout(this.state.timeoutId);
    this.setState({
      rendered: true
    });
  };

  render() {
    return(
      <View style={styles.container}>
        <TouchableHighlight onPress={this.swap.bind(this)}>
          <Text style={styles.welcome}>HomePage</Text>
        </TouchableHighlight>
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
  },
  dot: {
    height: 60,
    width: 60,
    margin: 60,
    borderRadius: 30,
  },
  clickedDot: {
    backgroundColor: '#DA8',
    borderColor: '#642',
    borderStyle: 'solid',
    borderWidth: 4
  },
  unclickedDot: {
    backgroundColor: '#ABC',
    borderColor: '#456',
    borderStyle: 'solid',
    borderWidth: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = LoadPage;
