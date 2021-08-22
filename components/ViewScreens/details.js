import React,{useEffect} from 'react'
import { StyleSheet, TouchableOpacity, View, Image,Text,Button ,ImageBackground,Dimensions,Animated } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Avatar, Icon } from 'react-native-elements'
import TextTicker from 'react-native-text-ticker'
import TrackPlayer , {
  Capability,
  useTrackPlayerEvents,
  usePlaybackState,
  TrackPlayerEvents,
  STATE_PLAYING,
  Event,
  useTrackPlayerProgress,
} from 'react-native-track-player';

import Controller from './Controller';
import Slider from './Slider'

export default class MusicPlayer extends React.Component {

    constructor(props) {  
        super(props);  
        this.state={
          artwork: 'https://forum.byjus.com/wp-content/themes/qaengine/img/default-thumbnail.jpg',
          ver: true,
          like:false,
          title:"None",
          artist:"None",
          value: 0.0,
          isPlayerReady:false,
          url:'None',
          ver:false,
          index:0,
          songindex:0,
          datasource:null
          
        }
    }  
    
 
 async componentDidMount(){
   const name = this.props.route.params.Name;
   const data = this.props.route.params.data
    
    this.setState({
      datasource:data
    })
    var track = {
      "id": "1",
      "title": "Tujhe Rab Mana (feat. Shaan)",
      "artist": "Rochak",
      "artwork": "https://www.deccanherald.com/sites/dh/files/article_images/2020/05/19/Baaghi1-2102959503-1583400738.jpg",
      "url": "https://pagalsong.in/uploads/systemuploads/mp3/Baaghi%203/Tujhe%20Rab%20Mana%20-%20Baaghi%203%20128%20Kbps.mp3", // Load artwork from the file system
  };
   TrackPlayer.setupPlayer().then(async () => {
    console.log('Player ready');
    // TrackPlayer.add(JSON.stringify(data));
    TrackPlayer.add(data)
    TrackPlayer.play()
    this.setState({
      isPlayerReady:true
    })
    TrackPlayer.updateOptions({
      ratingType: TrackPlayer.RATING_5_STARS,
      stopWithApp: true,
      capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      ],
  
    });
    const trackid = (await TrackPlayer.getCurrentTrack())-1
    if(trackid !== this.state.index){
      this.setState({
        songindex: trackid
      })
      if (trackid > this.state.index) {
        goNext();
      } else {
        goPrv();
      }
    }
  });
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

goNext= async () => {
  this.setState({
    index: this.state.index+1
  })
}

goPrv = async () => {
  this.setState({
    index: this.state.index-1
  })
}


  render() {
    
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
    <View style={styles.container}>
      <ImageBackground
      style={{height: '60%',width: '100%',borderBottomLeftRadius:100,borderBottomRightRadius:100}}
        source={{
          uri:
            this.state.artwork,
        }}
        resizeMode="stretch"
        blurRadius={3}
      >
      <View style={styles.container1}>
      <View style={{marginTop: "80%"}}/> 
      {/*<Text style={{color:"white",fontSize: 30,fontWeight:'bold',marginBottom: 20}}>NOW PLAYING</Text>*/}
      <Image
                style={{height: 200,width: 250,borderRadius: 20,resizeMode:'stretch'}}
                  source={{
                    uri:
                      this.state.artwork,
                  }}
                />  

      <TextTicker
                style={{marginTop:20,fontSize:20,fontWeight:"bold",textAlign:"center"}}
                duration={3000}
                loop
                bounce
                repeatSpacer={100}
                marqueeDelay={3000}>
                  {this.state.title}
      </TextTicker>
      
      <TextTicker
                style={{marginTop:5,marginLeft:20,marginRight: 20,marginBottom:10,fontSize:16,fontWeight:"bold",textAlign:"center",color:'grey'}}
                duration={3000}
                loop
                bounce
                repeatSpacer={100}
                marqueeDelay={3000}>
             {this.state.artist}
      </TextTicker>
                {/*<View style={{flexDirection:'row'}}>
                  
          {!this.state.like 
          ? 
          <MaterialCommunityIcons name="heart-outline" onPress={()=>this.setState({like:true})} size={30} color="black" /> 
          :
          <MaterialCommunityIcons name="heart" size={30} color="red" onPress={()=>this.setState({like:false})} />
        }
                </View>*/}
      {/* <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
      <MaterialIcons name="replay-30" size={24} color="black" />
        <View key={1} style={{marginLeft: 20}}/> 
        <View key={2} style={{height:50,width: 50,backgroundColor:'#f6f7f8',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
          {/*<MaterialCommunityIcons name="step-backward" size={35} onPress={()=>alert("f")}  color="black" />*/}
          {/* <FontAwesome5 name="backward" size={30} color="black" />
        </View>
        <View key={3} style={{marginLeft: 20}}/> 
        {data}
        <View style={{marginLeft: 20}}/>
          <View key={4} style={{height:50,width: 50,backgroundColor:'#f6f7f8',borderRadius:50,justifyContent:'center',alignItems:'center'}}> */}
            {/*<MaterialCommunityIcons name="step-forward" size={35} color="black" onPress={()=>alert("f")} />*/}
            {/* <FontAwesome5 name="forward" size={30} color="black" />
          </View>
        <View key={5} style={{marginLeft: 20}}/> 
          <MaterialIcons name="forward-30" size={24} color="black" />
      </View> */}
       {/* <MaterialIcons name="replay-30" size={24} color="black" />
        <View key={1} style={{marginLeft: 20}}/> 
        <View key={2} style={{height:50,width: 50,backgroundColor:'#f6f7f8',borderRadius:50,justifyContent:'center',alignItems:'center'}}> */}
          {/*<MaterialCommunityIcons name="step-backward" size={35} onPress={()=>alert("f")}  color="black" />*/}
          {/* <FontAwesome5 name="backward" size={30} color="black" />
        </View>
        <View key={3} style={{marginLeft: 20}}/> 
      {data}
        <View style={{marginLeft: 20}}/>
          <View key={4} style={{height:50,width: 50,backgroundColor:'#f6f7f8',borderRadius:50,justifyContent:'center',alignItems:'center'}}> */}
            {/*<MaterialCommunityIcons name="step-forward" size={35} color="black" onPress={()=>alert("f")} />*/}
            {/* <FontAwesome5 name="forward" size={30} color="black" />
          </View>
        <View key={5} style={{marginLeft: 20}}/> 
          <MaterialIcons name="forward-30" size={24} color="black" />
       */}
       </View>
       <View style={{marginTop: 150}}/>
      </ImageBackground>
      <View style={{justifyContent:'center',alignItems:'center'}}>
      
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
                
                <FontAwesome5 name="backward" onPress={()=>{
                  this.goPrv()
                }} size={24} color="black" />
                <View style={{height:50,width:50,background:'lightgrey',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                {this.state.ver?<FontAwesome5 name="play" onPress={()=>{
                  this.playMusic() }} size={24} color="black" />
                :
                <FontAwesome5 name="pause" onPress={()=>{
                  this.pushMusic()
                }} size={24} color="black" />}
                </View>
                <FontAwesome5 name="forward" onPress={()=>{
                  this.goNext()
                }} size={24} color="black" />
                </View>
                </View>
                </View>
      </View>
      {/*<Image
        style={{height: 200,width: 250,borderRadius: 10,resizeMode:'stretch'}}
          source={{
            uri:
              this.state.artwork,
          }}
        />  
      <View style={{marginTop: 50}}/> 
      <View style={{flexDirection:"row",justifyContent:'space-between'}}>
        <View style={{height:50,width: 50,backgroundColor:'#f6f7f8',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
          <MaterialCommunityIcons name="step-backward" size={35}  color="black" />
        </View>
        <View style={{marginLeft: 80}}/> 
        {data}
        <View style={{marginLeft: 80}}/>
          <View style={{height:50,width: 50,backgroundColor:'#f6f7f8',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
          <MaterialCommunityIcons name="step-forward" size={35} color="black" />
          </View>
      </View>
      <View style={{marginTop: 50}}/> 

                    
       */}
      
    </View>
  )
}

}

TrackPlayer.registerEventHandler(require('../../service.js'));
const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff',
    },
    container1: {
      justifyContent:'center',
      alignItems:'center',
      flex:1
    },
  })
  