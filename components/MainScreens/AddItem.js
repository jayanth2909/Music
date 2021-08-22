import React from 'react'
import {View,Text,Dimensions,TextInput,TouchableOpacity,ScrollView,Image} from 'react-native'
import Firebase from '../Firebase'

const width = Dimensions.get('window').width
var search_Data=[]
export default class AddItem extends React.Component{


    constructor(props){
        super(props);
        this.state = {
          day:'',
          bdcolor:'',
          textcolor:'',
          Name:'',
          Username:'',
          Date: new Date().toLocaleString(),
          visible:false,
          veri:'red',
          imageurl:'https://forum.byjus.com/wp-content/themes/qaengine/img/default-thumbnail.jpg',
          Img:'https://forum.byjus.com/wp-content/themes/qaengine/img/default-thumbnail.jpg'
        }
      }

      Addlist(playlistname,username,date,image){
        var email = Firebase.auth().currentUser.email
        var email1 = email.split("@").join("_")
        var email2 = email1.split(".").join("-")
        if(image==''){
            image = "https://forum.byjus.com/wp-content/themes/qaengine/img/default-thumbnail.jpg"
        }
          Firebase.database().ref().child('Search').child(playlistname).set({
            Email:email2,
            PlaylistName:playlistname,
            Username:username,
            Date:date,
            Image: image
          }).then(()=>{
              alert("Added your playlist")
              this.setState({
                  Name:'',
                  Username:'',
                  visible:false,
                  veri:"red",
                  imageurl:'https://forum.byjus.com/wp-content/themes/qaengine/img/default-thumbnail.jpg',
                  Img:'https://forum.byjus.com/wp-content/themes/qaengine/img/default-thumbnail.jpg'
              })
          })
      }

      verify(name){
          Firebase.database().ref().child("Search").on('value',function(data){
              search_Data=[]
              data.forEach((item,key)=>{
                  search_Data.push(item.val().PlaylistName)
              })
          })
          if(search_Data.includes(name)){
            this.setState({
                visible:false,
                veri:'red'
            })
          }else{
            this.setState({
                visible:true,
                veri:'green'
            })
            console.log("asdkjfhs")
        }
      }
    
      render() {
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
        return(
            <ScrollView style={{backgroundColor:this.state.bdcolor,flex:1}}>
                <View style={{height: 65,width:width,backgroundColor:this.state.textcolor,borderBottomRightRadius:10,justifyContent:'center'}}>
                    <Text style={{color:this.state.bdcolor,fontSize: 23,fontWeight:'bold',marginLeft: 20}}>Add New PlayList</Text>
                </View>

                <View style={{marginTop:20}}>

                    <View style={{margin:10}}>
                        <Text style={{color:this.state.textcolor,fontSize:18,fontWeight:'bold'}}>Playlist Name</Text>
                        <View style={{marginTop:10,height: 40,width: width-50,borderColor:this.state.textcolor,borderWidth:1,borderRadius:5}}>
                            <TextInput 
                                style={{fontSize:15,color:this.state.textcolor,marginLeft:10}}
                                placeholder="Playlist name..."
                                placeholderTextColor={this.state.textcolor}
                                onChangeText={(value)=>{
                                    this.setState({Name:value})
                                }}
                            />            
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity onPress={()=> this.verify(this.state.Name)} style={{margin:10,marginRight:20,height:35,width:100,backgroundColor:this.state.veri,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                                <Text style={{color:"white",fontSize:18,fontWeight:'bold'}}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                        { this.state.visible ?
                        <View>
                            <View>
                            <Text style={{color:this.state.textcolor,fontSize:18,fontWeight:'bold'}}>Publisher Name</Text>
                            <View style={{marginTop:10,height: 40,width: width-50,borderColor:this.state.textcolor,borderWidth:1,borderRadius:5}}>
                                <TextInput 
                                    style={{fontSize:15,color:this.state.textcolor,marginLeft:10}}
                                    placeholder="Username ..."
                                    placeholderTextColor={this.state.textcolor}
                                    onChangeText={(value)=>{
                                        this.setState({Username:value})
                                    }}
                                />            
                            </View>
                            <Text style={{color:this.state.textcolor,fontSize:18,fontWeight:'bold',marginTop:10}}>Playlist Image</Text>
                            <View style={{marginTop:10,height: 40,width: width-50,borderColor:this.state.textcolor,borderWidth:1,borderRadius:5}}>
                                <TextInput 
                                    style={{fontSize:15,color:this.state.textcolor,marginLeft:10}}
                                    placeholder="Image Url ..."
                                    placeholderTextColor={this.state.textcolor}
                                    onChangeText={(value)=>{
                                        this.setState({imageurl:value})
                                    }}
                                />            
                            </View>
                            <View style={{alignItems:'flex-end'}}>
                                <TouchableOpacity onPress={()=> this.setState({Img:this.state.imageurl})} style={{margin:10,marginRight:20,height:35,width:100,backgroundColor:this.state.veri,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                                    <Text style={{color:"white",fontSize:18,fontWeight:'bold'}}>Show</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Image style={{height:150,width:150,borderRadius:10,borderWidth:1,borderColor:this.state.textcolor}} source={{
                                    uri:this.state.Img
                                }} />
                            </View>
                            <View style={{height:30}}/>
                            <Text style={{color:this.state.textcolor,fontSize:18,fontWeight:'bold'}}>Todays Date</Text>
                            <View style={{marginTop:10,height: 40,width: width-50,borderColor:this.state.textcolor,borderWidth:1,borderRadius:5,justifyContent:'center'}}>
                                <Text style={{fontSize:15,color:this.state.textcolor,marginLeft:10}}>{this.state.Date}</Text>          
                            </View>
                        </View>

                        <View style={{justifyContent:'center',alignItems:'center',margin:30}}>
                            <TouchableOpacity onPress={()=>this.Addlist(this.state.Name,this.state.Username,this.state.Date.split(" ").join("_"),this.state.Img)} style={{height:40,width:width-200,backgroundColor:this.state.textcolor,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                                <Text style={{color:this.state.bdcolor,fontSize:20,fontWeight:'bold'}}>Create</Text>
                            </TouchableOpacity>
                        </View> 
                        </View>
                    :
                    <View style={{alignItems:'center',margin:20}}>
                        <Text style={{color:this.state.textcolor}}>Please Verify to Continue</Text>
                    </View>}
                    </View>
                </View>
                


            </ScrollView>
        )
    }
}