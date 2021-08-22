import React, { Component} from 'react';
import {View,Text,Dimensions,FlatList,Image,RefreshControl,TouchableOpacity,ScrollView} from 'react-native'
import Firebase from '../Firebase'

const width = Dimensions.get('window').width

var data1=[]
export default class Recent extends Component {

    constructor(props){
        super(props);
        this.state = {
          day:'',
          bdcolor:'',
          textcolor:'',
          refreshing:false
        }
      }

      _onRefresh = () => {
          this.setState({refreshing:true})
          var email = Firebase.auth().currentUser.email
        var email1 = email.split("@").join("_")
        var email2 = email1.split(".").join("-")
        var username = 'None'
        var Notifcation = false
        var Update = false
        this.setState({
          email:email2
        })
        try{
          Firebase.database().ref().child(email2).child("Recent Played").on('value', function(data){
            
            data1=[]
            data.forEach((item,key)=>{
              var feed ={
                name: item.val().Name,
                artwork: item.val().Artwork,
                code: item.val().Code
              }
              
              data1.push(feed)
            })
          })
          this.setState({refreshing:false})
          
        }catch(err){
          console.log(err)
        }
      }

      componentDidMount(){
        var email = Firebase.auth().currentUser.email
        var email1 = email.split("@").join("_")
        var email2 = email1.split(".").join("-")
        var username = 'None'
        var Notifcation = false
        var Update = false
        this.setState({
          email:email2
        })
        try{
          Firebase.database().ref().child(email2).child("Recent Played").on('value', function(data){
            
            data1=[]
            data.forEach((item,key)=>{
              var feed ={
                name: item.val().Name,
                artwork: item.val().Artwork,
                code: item.val().Code
              }
              
              data1.push(feed)
            })
          })
          
        }catch(err){
          console.log(err)
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

        return (
            <View style={{backgroundColor:this.state.bdcolor,flex:1}}>
                <View style={{height: 65,width:width,backgroundColor:this.state.textcolor,borderBottomRightRadius:10,justifyContent:'center'}}>
                    <Text style={{color:this.state.bdcolor,fontSize: 23,fontWeight:'bold',marginLeft: 20}}>Recently Played</Text>
                </View>
                <ScrollView style={{width:width}}>
                    <FlatList 
                        horizontal={false} showsVerticalScrollIndicator={false}
                        keyExtractor = {(item) => item.id}
                        data = {data1}   
                        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
                        renderItem = {({item}) => (
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Viewscreen',{Name: item.name,Artwork: item.artwork,Code:item.code})} style={{height: 100,width:width-20,backgroundColor:this.state.textcolor,borderRadius:10,margin:10,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                <Image source={{uri:item.artwork}} style={{resizeMode:'stretch',height:80,width:80,borderRadius:10,marginLeft:10}}/>
                                <Text style={{marginLeft:10,fontSize:17,color:this.state.bdcolor}}>{item.name.split("_").join(" ")}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            </View>
        )}
}