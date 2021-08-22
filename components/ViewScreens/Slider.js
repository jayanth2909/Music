import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet,ProgressBar} from 'react-native';
import Slider1 from '@react-native-community/slider';
import Slider  from 'react-native-slider'

import TrackPlayer,{
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents
} from 'react-native-track-player';
import { render } from 'react-dom';

export default class ProgressBar1 extends TrackPlayer.ProgressComponent {
  // const progress = useTrackPlayerProgress();

  formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  handleChange = (val) => {
    TrackPlayer.seekTo(val);
  };

  render(){
    console.log(TrackPlayer);
  return (
    <View style={styles.progress2}>
      <View style={styles.progress1}>
      <Text>{this.formatTime(this.state.position)}</Text>
      
      <Text>{this.formatTime(this.state.duration)}</Text>
      </View>
      <View style={{marginTop: 5}}/>
          <Slider1
            style={{width: 320}}
            minimumValue={0}
            value={this.state.position}
            maximumValue={this.state.duration}
            minimumTrackTintColor="#000000"
            onSlidingComplete={this.handleChange}
            maximumTrackTintColor="grey"
            thumbTintColor="red"
          />
      {/* <View style={styles.progress}>
      <View style={{ height: 10, backgroundColor: "red",borderBottomRightRadius: 5,borderTopRightRadius: 5,}} />
      <View
        style={{
          flex: progress.duration - progress.position,
          height: 10,
          backgroundColor: "lightgrey",
          borderRadius: 5
        }}
      />
    
      </View>
       */}
    </View>
  );
      }
}


const styles = StyleSheet.create({
  card: {
    width: "80%",
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: "center",
    shadowColor: "black",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 1 }
  },
  cover: {
    width: 140,
    height: 140,
    marginTop: 20,
    backgroundColor: "grey"
  },
  progress1:{
    flexDirection: "row",
    width: 300,
    justifyContent:'space-between'

  },
  progress: {
    height: 10,
    width: 300,
    backgroundColor:'red'
  },
  title: {
    marginTop: 10
  },
  artist: {
    fontWeight: "bold"
  },
  controls: {
    marginVertical: 20,
    flexDirection: "row"
  },
  controlButtonContainer: {
    flex: 1
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: "center"
  }
});
// export default class SliderComp extends React.Component {

//     constructor(props){
//         super (props);
//         var url = this.props.url1
//         this.state = {
//             value:0
//         }
//         setInterval(() => {
//             this.setState({
//                 value:this.state.value+1
//             })
//         }, 1000);

//     }

//     componentDidMount(){
      
//     }

//   formatTime = (secs) => {
//     let minutes = Math.floor(secs / 60);
//     let seconds = Math.ceil(secs - minutes * 60);

//     if (seconds < 10) seconds = `0${seconds}`;

//     return `${minutes}:${seconds}`;
//   };

//   handleChange = (val) => {
//     this.setState({
//         value:val
//     })
//     TrackPlayer.seekTo(val);
//   };

//   //components
//  render(){

//     return (
//         <View style={styles.container}>
//           {/* <Slider key={1}
//             style={{width: 320}}
//             minimumValue={0}
//             value={this.state.value}
//             onValueChange={(value) => this.handleChange(value)}
//             maximumValue={234}
//             minimumTrackTintColor="#000000"
//             maximumTrackTintColor="#000000"
//             thumbTintColor="#000000"
//           /> */}

//           <Slider
//             trackStyle={customStyles3.track}
//             thumbStyle={customStyles3.thumb}
//             value={this.state.value}
//             onValueChange={(value) => this.handleChange(value)}
//             minimumTrackTintColor='black'
//           />
//         </View>
//       );
//     }
//  }

// const styles = StyleSheet.create({
//   container: {
//     height: 70,
//   },
//   timers: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// var customStyles3 = StyleSheet.create({
//   track: {
//     height: 10,
//     borderRadius: 4,
//     backgroundColor: 'lightgrey',
//     shadowColor: 'black',
//     shadowOffset: {width: 0, height: 1},
//     shadowRadius: 1,
//     shadowOpacity: 0.15,
//     width: 300
//   },
//   thumb: {
//     width: 20,
//     height: 20,
//     backgroundColor: '#f8a1d6',
//     borderColor: 'red',
//     borderWidth: 5,
//     borderRadius: 10,
//     shadowColor: 'black',
//     shadowOffset: {width: 0, height: 2},
//     shadowRadius: 2,
//     shadowOpacity: 0.35,
//   }
// });