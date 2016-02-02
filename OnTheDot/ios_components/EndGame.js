'use strict';
import React, {
  Component,
  Text,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';

class EndGame extends Component {

  render() {
    if(this.props.isOver){
      return(
        <View style={styles.container}>
          <Text>{this.props.result}</Text>
        </View>
      );
    }
    else{
      return <View />
    }
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
    borderStyle: 'solid',
    borderWidth: 4,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  clickedDot: {
    backgroundColor: '#D43',
    borderColor: '#E54'
  },
  unclickedDot: {
    backgroundColor: '#BBC',
    borderColor: '#CCD'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = EndGame;
