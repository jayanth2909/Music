import React, { Component } from 'react';
import { View, Text,FlatList,TouchableOpacity,Image ,Dimensions} from 'react-native';
import Firebase from '../Firebase'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

var playlistdata=[]

const width = Dimensions.get('window').width

class Addtoplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Url:'',
        Artwork:'',
        Artist:'',
        Title:'',
        day:'',
        bdcolor:'',
        textcolor:'',
    };
  }

  componentDidMount(){
    const Url = this.props.route.params.Url
    const Artwork = this.props.route.params.Artwork
    const Artist  = this.props.route.params.Artist
    const Title  = this.props.route.params.Title
    var email = Firebase.auth().currentUser.email
    var email1 = email.split("@").join("_")
    var email2 = email1.split(".").join("-")
    var email3 = email2.split(".").join("-")
    this.setState({
        Url:Url,
        Artist:Artist,
        Artwork:Artwork,
        Title:Title
    })

    Firebase.database().ref().child("Search").on('value',function(data){
        playlistdata=[]
        data.forEach((item,key)=>{
            if(item.val().Email===email3){
              var feed={
                Name:item.key,
                Username:item.val().Username,
                Image:item.val().Image,
              }
              playlistdata.push(feed)
            }
        })
    })

  }

  addSong(Title,Artwork,Artist,Url,name){
    Firebase.database().ref().child("Playlist").child(name.split(" ").join("")).child(Title.split(" ").join("")).update({
        Title:Title,
        Artwork:Artwork,
        Artist:Artist,
        Url:Url
    }).then(()=>{
        alert("added")
        this.props.navigation.pop()
    })
  }


  render() {

    var date, hour
 
    date = new Date();
    hour = date.getHours(); 
    //hour = hour -10
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
      <View>
        <View style={{height:20}}/>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('AddItem')} style={{height: 80,width:width-10,backgroundColor:this.state.textcolor,margin: 5,borderRadius: 10,justifyContent:'flex-start',alignItems:'center',flexDirection:"row"}}>
          <View style={{height:60,width:60,borderColor:this.state.bdcolor,borderWidth:1,marginLeft: 10,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
            <MaterialIcon name="add-circle" color={this.state.bdcolor} size={44}/>
          </View>
          <Text style={{color:this.state.bdcolor,fontSize: 20,fontWeight:'bold',marginLeft:20}}>Add New Playlist</Text>
        </TouchableOpacity>

        <View style={{height:40}}/>
          <FlatList
                horizontal={false} showsVerticalScrollIndicator={false}
                keyExtractor = {(item) => item.id}
                data = {playlistdata}
                renderItem = {({item}) => (
                    <TouchableOpacity onPress={()=> this.addSong(this.state.Title,this.state.Artwork,this.state.Artist,this.state.Url,item.Name)} style={{height: 80,width:width-10,backgroundColor:this.state.textcolor,margin: 5,borderRadius: 10,justifyContent:'flex-start',alignItems:'center',flexDirection:"row"}}>
                          <View style={{height:60,width:60,borderColor:this.state.bdcolor,borderWidth:1,marginLeft: 10,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                            <Image source={{
                              uri: item.Image
                            }} style={{height: 60,width:60,borderRadius:10}}/>
                          </View>
                          <View style={{flexDirection:'column'}}>
                            <Text style={{color:this.state.bdcolor,fontSize: 18,fontWeight:'bold',marginLeft:20,marginBottom:10}}>{item.Name}</Text>
                            <Text style={{color:this.state.bdcolor,fontSize: 13,fontWeight:'bold',marginLeft:20}}>{item.Username}</Text>
                          </View>
                      </TouchableOpacity>
                )}

            />
      </View>
    );
  }
}

export default Addtoplay;
