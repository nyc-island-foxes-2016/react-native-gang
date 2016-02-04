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
          underlayColor='transparent'>
          <Text style={styles.overlayEndGame}>
            {this.props.result}
          </Text>
        </TouchableHighlight>
        <View style={styles.overlay}>
        <TouchableHighlight
          style={styles.tops}
          onPress={this.props.onSwap}
          underlayColor='transparent'>
          <Text style={styles.button}>
            Play Again!
          </Text>
        </TouchableHighlight>
        </View>
        </View>
      );
    }
    else{
      return <View />
    }
  }

}

module.exports = EndGame;
