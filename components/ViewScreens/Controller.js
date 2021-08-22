import React, {useEffect, useState, useRef} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
  } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TrackPlayer, {
    usePlaybackState,
    useTrackPlayerEvents,
    Event,
  } from 'react-native-track-player';
import { set } from 'react-native-reanimated';
import Slider from './Slider'

  

 

export default class Controller extends React.Component {
   
  constructor(props){
      super(props);
      this.state = {
          ver:false,
          url: ''
      }
  }

  componentDidMount(){
    var url = this.props.url1
        this.setState({
          url:url
        })
  }
  
    playMusic()
    { 
        this.setState({
            ver:false
        })
      TrackPlayer.play();
    }
  
    pushMusic(){
        this.setState({
            ver:true
        })
        
      TrackPlayer.pause();
    }


    render(){
        var data=[];
        
        
        try{
            if(this.state.ver===false){
                data.push(
                  <TouchableOpacity onPress={()=>this.playMusic} style={{height: 70,width: 70,backgroundColor:'#f6355d',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                    <Feather name="play"  style={{marginLeft:3}} color="white" size={35}/>
                  </TouchableOpacity>
                )
            }
            else{
                data.push(
                  <TouchableOpacity onPress={()=>this.pushMusic} style={{height:70,width: 70,backgroundColor:'#f6355d',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                    <Feather name="pause"  color='white' size={35} />
                  </TouchableOpacity>
                )
        }
        }catch (error) {
            // handle Error
            alert(error)
        }
  return (
    // <View style={{alignItems:'center',justifyContent:'center'}}>
    //   {data}
    //   <View style={styles.container}>
    //   <MaterialIcons name="replay-30" size={24} color="black" />
    //     <View key={1} style={{marginLeft: 20}}/> 
    //     <View key={2} style={{height:50,width: 50,backgroundColor:'#f6f7f8',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
    //       {/*<MaterialCommunityIcons name="step-backward" size={35} onPress={()=>alert("f")}  color="black" />*/}
    //       <FontAwesome5 name="backward" size={30} color="black" />
    //     </View>
    //     <View key={3} style={{marginLeft: 20}}/> 
      
    //     <View style={{marginLeft: 20}}/>
    //       <View key={4} style={{height:50,width: 50,backgroundColor:'#f6f7f8',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
    //         {/*<MaterialCommunityIcons name="step-forward" size={35} color="black" onPress={()=>alert("f")} />*/}
    //         <FontAwesome5 name="forward" size={30} color="black" />
    //       </View>
    //     <View key={5} style={{marginLeft: 20}}/> 
    //       <MaterialIcons name="forward-30" size={24} color="black" />
    //   </View>
          
    //   </View>
<View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
              <View style={{marginTop: 10,width:200,justifyContent:'space-around',flexDirection:'row',alignItems:'center'}}>
                <Feather name="share-2" size={24} color="black" />
                  <Feather name="download" size={24} color="black" />
                  <Feather name="heart" size={24} color="black" />
                </View>
                </View>
                
                <View style={{alignItems:'center'}}>
                <View style={{marginTop:50}}>
                <Slider url1={this.state.url}/>
                </View>
                <View style={{marginTop: 20 ,flexDirection:'row',width:250,justifyContent:'space-evenly',alignItems:'center'}}>
                
                <FontAwesome5 name="backward" size={24} color="black" />
                <View style={{height:50,width:50,background:'lightgrey',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                {this.state.ver?<FontAwesome5 name="play" onPress={()=>{
                  this.playMusic() }} size={24} color="black" />
                :
                <FontAwesome5 name="pause" onPress={()=>{
                  this.pushMusic()
                }} size={24} color="black" />}
                </View>
                <FontAwesome5 name="forward" size={24} color="black" />
                </View>
                </View>
                </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:'center'
  },
});