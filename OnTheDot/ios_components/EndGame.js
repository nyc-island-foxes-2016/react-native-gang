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
        <View style={styles.overlay}>
        <TouchableHighlight
          onPress={this.props.onSwap}
          activeOpacity={0.2}>
          <Text style={styles.overlayEndGame}>
            {this.props.result}
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
