import React, { Component } from 'react'
import { Text, View,Dimensions,Image,TouchableOpacity,RefreshControl,FlatList,ScrollView } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Heart from '../../assets/Icons/Heart.png'
import Recently from '../../assets/Icons/recently.jpg'
import Firebase from '../Firebase'

const width = Dimensions.get('window').width

var playlist=[]
class Library extends Component {

  constructor(props){
    super(props);
    this.state = {
      day:'',
      bdcolor:'',
      textcolor:'',
      artwork: 'https://forum.byjus.com/wp-content/themes/qaengine/img/default-thumbnail.jpg',
      refreshing:false
    }

    var email = Firebase.auth().currentUser.email
    var email1 = email.split("@").join("_")
    var email2 = email1.split(".").join("-")
    Firebase.database().ref().child("Search").on('value',function(data){
      playlist=[]
      data.forEach((item,key)=>{
        if(item.val().Email==email2){
          var feed = {
            Playlistname:item.val().PlaylistName,
            Date: item.val().Date,
            Username: item.val().Username,
            Image:item.val().Image,
          }
          playlist.push(feed)
        }
      })
    })
  }

   _onRefresh = () => {
          this.setState({refreshing:true})
          var email = Firebase.auth().currentUser.email
          var email1 = email.split("@").join("_")
          var email2 = email1.split(".").join("-")
          Firebase.database().ref().child("Search").on('value',function(data){
            playlist=[]
            data.forEach((item,key)=>{
              if(item.val().Email==email2){
                var feed = {
                  Playlistname:item.val().PlaylistName,
                  Date: item.val().Date,
                  Username: item.val().Username,
                  Image:item.val().Image,
                }
                playlist.push(feed)
              }
            })
          })
          this.setState({refreshing:false})
      }


  componentDidMount(){
    var email = Firebase.auth().currentUser.email
    var email1 = email.split("@").join("_")
    var email2 = email1.split(".").join("-")
    Firebase.database().ref().child("Search").on('value',function(data){
      playlist=[]
      data.forEach((item,key)=>{
        if(item.val().Email==email2){
          var feed = {
            Playlistname:item.val().PlaylistName,
            Date: item.val().Date,
            Username: item.val().Username,
            Image:item.val().Image,
          }
          playlist.push(feed)
        }
      })
    })
  }

  render() {
    console.log(playlist)
    var date, hour
 
    date = new Date();
    hour = date.getHours(); 
    if(hour>=4 && hour<12){
      this.state.day = 'Morning',
      this.state.bdcolor = 'white',
      this.state.textcolor = "black"
    }
    else if(hour>=12 && hour<16){
      this.state.day = 'Afternoon',
      this.state.bdcolor = 'lightgrey',
      this.state.textcolor = "black"
    }
    else if(hour>=16 && hour<19){
      this.state.day = 'Evening',
      this.state.bdcolor = 'grey',
      this.state.textcolor = "white"
    }
    else{
      this.state.day = "Night",
      this.state.bdcolor = 'black',
      this.state.textcolor = "white"
    }

    return (
      <ScrollView style={{backgroundColor:this.state.bdcolor,flex:1}} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}>
        <View style={{height: 65,width:width,backgroundColor:this.state.textcolor,borderBottomRightRadius:10,justifyContent:'center'}}>
              <Text style={{color:this.state.bdcolor,fontSize: 23,fontWeight:'bold',marginLeft: 20}}>Library</Text>
        </View>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('LikedMusic')}  style={{height: 80,width:width-10,backgroundColor:this.state.textcolor,margin: 5,borderRadius: 10,justifyContent:'flex-start',alignItems:'center',flexDirection:"row"}}>
          <View style={{height:60,width:60,borderColor:this.state.bdcolor,borderWidth:1,marginLeft: 10,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
            <Image source={Heart} style={{height: 60,width:60,borderRadius:10}}/>
          </View>
          <Text style={{color:this.state.bdcolor,fontSize: 20,fontWeight:'bold',marginLeft:20}}>Liked Songs</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Recent')} style={{height: 80,width:width-10,backgroundColor:this.state.textcolor,margin: 5,borderRadius: 10,justifyContent:'flex-start',alignItems:'center',flexDirection:"row"}}>
          <View style={{height:60,width:60,borderColor:this.state.bdcolor,borderWidth:1,marginLeft: 10,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
            <Image source={Recently} style={{height: 60,width:60,borderRadius:10}}/>
          </View>
          <Text style={{color:this.state.bdcolor,fontSize: 20,fontWeight:'bold',marginLeft:20}}>Recently Played</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> this.props.navigation.navigate('AddItem')} style={{height: 80,width:width-10,backgroundColor:this.state.textcolor,margin: 5,borderRadius: 10,justifyContent:'flex-start',alignItems:'center',flexDirection:"row"}}>
          <View style={{height:60,width:60,borderColor:this.state.bdcolor,borderWidth:1,marginLeft: 10,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
            <MaterialIcon name="add-circle" color="red" size={44}/>
          </View>
          <Text style={{color:this.state.bdcolor,fontSize: 20,fontWeight:'bold',marginLeft:20}}>Add New Playlist</Text>
        </TouchableOpacity>

        <View style={{alignItems:'flex-start',justifyContent:'flex-start',margin:10}}>
          <Text style={{color:this.state.textcolor,fontSize: 25,fontWeight:'bold'}}>Your Playlist</Text>
        </View>
        <View>
        <FlatList
              keyExtractor = {(item) => item.id}
              data = {playlist}
              renderItem = {({item}) => (
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Playlist',{Name:item.Playlistname,Date:item.Date.split("_").join(" "),Image:item.Image,Username:item.Username})} style={{height: 80,width:width-10,backgroundColor:this.state.textcolor,margin: 5,borderRadius: 10,justifyContent:'flex-start',alignItems:'center',flexDirection:"row"}}>
                  <View style={{height:60,width:60,borderColor:this.state.bdcolor,borderWidth:1,marginLeft: 10,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                    <Image source={{
                      uri: item.Image
                    }} style={{height: 60,width:60,borderRadius:10}}/>
                  </View>
                  <View style={{flexDirection:'column'}}>
                    <Text style={{color:this.state.bdcolor,fontSize: 20,fontWeight:'bold',marginLeft:20}}>{item.Playlistname}</Text>
                    <Text style={{color:this.state.bdcolor,fontSize: 15,fontWeight:'bold',marginLeft:20}}>{item.Date.split("_").join(" ")}</Text>
                  </View>
              </TouchableOpacity>
              )}
            />
        </View>
      </ScrollView>
    )
  }
}

export default Library