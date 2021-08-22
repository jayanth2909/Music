import React,{useEffect} from 'react'
import { StyleSheet, TouchableOpacity, View, Image,Text,Button ,ImageBackground,Dimensions,Animated } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import Firebase from '../Firebase'

var new_data=[]


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
          datasource:null,
          count:0
          
        }
    }  
    
 
 async componentDidMount(){
   const name = this.props.route.params.Name;
   const artwork = this.props.route.params.Artwork;
   const data = this.props.route.params.data
   const id1 = this.props.route.params.id;
   const code  = this.props.route.params.Code
   console.log(id1)
   var email = Firebase.auth().currentUser.email
    var email1 = email.split("@").join("_")
    var email2 = email1.split(".").join("-")
    Firebase.database().ref().child(email2).child("Recent Played").child(name).update({
      Name:name,
      Artwork:artwork,
      Code:code
    })
    
    Firebase.database().ref().child(email2).child("Liked").on('value',function(likeddata){
      new_data=[]
      likeddata.forEach((item,key)=>{
        new_data.push(item.val().title)
      })
    })
    Firebase.database().ref().child(email2).child("Playing").set({
      Data:"'"+JSON.stringify(data)+"'",
      id:id1,
      artwork:data[id1].artwork,
      artist:data[id1].artist,
      title:data[id1].title
    })
    this.setState({
      datasource:data,
      // artist: data[this.state.songindex].artist,
      // artwork: data[this.state.songindex].artwork,
      // title: data[this.state.songindex].title
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
    this.setState({
      isPlayerReady:true
    })
    TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_JUMP_FORWARD
      ],
      
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_FORWARD
      ]
  
    });

    this.likehow(this.state.datasource[id1-1].title)    
    
    if(id1==0){
      this.setState({
        index: id1,
        artist: this.state.datasource[id1].artist,
        artwork: this.state.datasource[id1].artwork,
        title: this.state.datasource[id1].title
      })
      TrackPlayer.play()
    }
    else{
      TrackPlayer.skip(this.state.datasource[id1-1].id)
      .then((_) => {
        this.setState({
          index: id1-1,
          artist: this.state.datasource[id1-1].artist,
          artwork: this.state.datasource[id1-1].artwork,
          title: this.state.datasource[id1-1].title
        })
        TrackPlayer.play();
      })
      .catch((e) => {
        console.log("erroe")
      })
    }
  });

    
  
 }
 
 likehow(name){
  for(var i=0;i<new_data.length;i++){
    var val = new_data[i]
    if(val.includes(name)){
      this.setState({
        like:true
      })
    }

  }
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

goNext(){
  try{
    TrackPlayer.skip(this.state.datasource[this.state.index].id)
  .then((_) => {
    this.setState({
      index: this.state.index+1,
      artist: this.state.datasource[this.state.index].artist,
      artwork: this.state.datasource[this.state.index].artwork,
      title: this.state.datasource[this.state.index].title
    })
    TrackPlayer.play();
  })
  .catch((e) => {
    console.log("erroe")
  })
  }
  catch(err){
    this.setState({
      index: 0,
      songindex: 0
    })
  }
  
}

goPrv(){
  try{
    TrackPlayer.skip(this.state.datasource[this.state.index].id)
      .then((_) => {
        this.setState({
          index: this.state.index-1,
          artist: this.state.datasource[this.state.index].artist,
          artwork: this.state.datasource[this.state.index].artwork,
          title: this.state.datasource[this.state.index].title
        })
        TrackPlayer.play();
      })
      .catch((e) => {
        console.log("erroe")
      })
  }
  catch(err){
    console.log("error")
    this.setState({
      index: 0,
      songindex:0

    })
  }
}

Like(name,artwork,data,index){
  var email = Firebase.auth().currentUser.email
    var email1 = email.split("@").join("_")
    var email2 = email1.split(".").join("-")
    var name1 = data[index].title
    var nam = name1.split(" ").join("_")
    var nam1 = nam.split(".").join("-")
    var nam2 = nam1.split("(")[0]
    var name3 = nam2
    this.setState({
      like:true
    })
    var num = new_data.length+1
    Firebase.database().ref().child(email2).child("Liked").child(num).update({
      id: num.toString(),
      title:data[index].title,
      artist: data[index].artist,
      artwork:data[index].artwork,
      url: data[index].url,
      
    })

}
Dislike(name,artwork,data,index){
  var email = Firebase.auth().currentUser.email
    var email1 = email.split("@").join("_")
    var email2 = email1.split(".").join("-")
    
    var name1 = name
    var nam = name1.split(" ").join("_")
    var nam1 = nam.split(".").join("-")
    var nam2 = nam1.split("(")[0]
    var name3 = nam2
    this.setState({
      like:false
    })
    var num = new_data.length+1
    Firebase.database().ref().child(email2).child("Liked").child(num).remove();

}




  render() {

    

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
                style={{height: 200,width: 250,borderRadius: 10,resizeMode:'stretch'}}
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
              <View style={{marginTop: 20,width:200,justifyContent:'space-around',flexDirection:'row',alignItems:'center'}}>
                <Feather name="share-2" size={24} color="grey" onPress={()=>alert('Coming Soon')} />
                  <Feather name="download" size={24} color="grey" onPress={()=>alert('Coming Soon')} />
                  {!this.state.like 
                      ? 
                      <Feather name="heart" onPress={()=>this.Like(this.state.title,this.state.artwork,this.state.datasource,this.state.index)} size={24} color="black" /> 
                      :
                      <FontAwesome name="heart" size={24} color="red" onPress={()=>this.Dislike(this.state.title,this.state.artwork,this.state.datasource,this.state.index)} />
                  }
                </View>
                </View>
                
                <View style={{alignItems:'center'}}>
                <View style={{marginTop:30}}>
                <Slider url1={this.state.url}/>
                </View>
                <View style={{marginTop: 20}}/>
                <View style={{marginTop: 20 ,flexDirection:'row',width:250,justifyContent:'space-evenly',alignItems:'center'}}>
                
                <TouchableOpacity style={{height:50,width:50,backgroundColor:'lightgrey',borderRadius:10,alignItems:'center',justifyContent:'center'}} onPress={()=>{
                  this.goPrv()
                }}>
                <FontAwesome5 name="backward"  size={24} color="black" />
                </TouchableOpacity>
                <View style={{height:50,width:50,background:'lightgrey',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                {this.state.ver?
                <TouchableOpacity style={{height:70,width:70,backgroundColor:'#5e4ba8',borderRadius:40,alignItems:'center',justifyContent:'center'}} onPress={()=>{
                  this.playMusic()
                }}>
                <FontAwesome5 name="play" size={24} color="white" /></TouchableOpacity>
                :
                <TouchableOpacity style={{height:70,width:70,backgroundColor:'#5e4ba8',borderRadius:40,alignItems:'center',justifyContent:'center'}} onPress={()=>{
                  this.pushMusic()
                }}>
                <FontAwesome5 name="pause"  size={24} color="white" /></TouchableOpacity>}
                </View>
                <TouchableOpacity style={{height:50,width:50,backgroundColor:'lightgrey',borderRadius:10,alignItems:'center',justifyContent:'center'}} onPress={()=>{
                  this.goNext()
                }}>
                <FontAwesome5 name="forward"  size={24} color="black" />
                </TouchableOpacity>
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
  