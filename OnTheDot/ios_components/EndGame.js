'use strict';
import React, {
  Component,
  Text,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './stylesheet';

class EndGame extends Component {

  render() {
    if(this.props.isOver){
      return(
        <View style={styles.container}>
          <Text>{this.props.result}</Text>
        <TouchableHighlight onPress={this.props.onSwap}>
          <Text style={styles.welcome}>
            Check Available Games
          </Text>
        </TouchableHighlight>
        </View>
      );
    }
    else{
      return <View />
    }
  }

}

module.exports = EndGame;
