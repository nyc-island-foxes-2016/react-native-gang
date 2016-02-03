'use strict';

import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './stylesheet';

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
    this.setState({
      rendered: true
    });

    this.props.navigator.replace({
      id: 'MainPage',
      atStart: true
      });
    clearTimeout(this.state.timeoutId);
  };

  render() {
    return(
      <View style={styles.container}>
        <TouchableHighlight onPress={this.swap.bind(this)}>
          <Text style={styles.welcome}>DOTS</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = LoadPage;
