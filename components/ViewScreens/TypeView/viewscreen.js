import React from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image,ActivityIndicator,Dimensions} from 'react-native'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Firebase from '../../Firebase'

const width = Dimensions.get('window').width

export default class Viewscreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          day:'',
          bdcolor:'',
          heart:false,
          dataSource:null,
          loading: true,
          email:'',
          name:'',
          artwork:'',
          code:''
        }
      }

      componentDidMount(){
        var email = Firebase.auth().currentUser.email
        var email1 = email.split("@").join("_")
        var email2 = email1.split(".").join("-")
        const name = this.props.route.params.Name  
          const Artwork = this.props.route.params.Artwork 
          const code = this.props.route.params.Code
        var username = 'None'
        var Notifcation = false
        var Update = false
        this.setState({
          email:email2,
          code:code,
          artwork:Artwork,
          name:name
        })
        axios.get("https://music-application-ftd.000webhostapp.com/"+code+"/"+name.split("_")[1]+name.split("_")[2]+".php")
            .then(response => {
                    this.setState({
                    dataSource: response.data,
                    lodaing : false
                    })
            })
            .catch(error => {
                alert(error);
            });
    }

      Like(name,artwork,artist,title,url){
        // Firebase.database().ref().child(this.state.email).child("Liked").child(title).set({
        //   artwork:artwork,
        //   artist:artist,
        //   title:title,
        //   url:url
        // })
      }
  

    render(){
        
         
        
        return(
            <View style={{backgroundColor:'#ececec',flex:1}}>
                <Image style={{height: '35%',width: '100%',borderBottomLeftRadius: 50,borderBottomRightRadius: 50}}
                    source={{
                    uri:
                        this.state.artwork,
                    }}
                    resizeMode="stretch" />
                {this.state.dataSource==null ?
                <View style={{justifyContent:'center',alignItems:'center',marginTop: 200}}>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="black"/>
                    </View>
                    <Text>Fetching Data</Text>
                </View>
                :
                <View>
                    <View style={{alignItems:'center',margin: 10}}>
                        <TouchableOpacity style={{height: 45,width: 100,backgroundColor:'red',alignItems:'center',justifyContent:'center',borderRadius: 10,}} onPress={()=> this.props.navigation.navigate('Musicplayer',{Name: this.state.name,data: this.state.dataSource,id: 1,Artwork: this.state.artwork,Code:this.state.code})}>
                            <Text style={{color:'white',fontSize: 20,fontWeight:'bold'}}>Play</Text>
                        </TouchableOpacity>
                    </View>
                <FlatList
                    horizontal={false} showsVerticalScrollIndicator={false}
                    keyExtractor = {(item) => item.id}
                    data = {this.state.dataSource}
                    renderItem = {({item}) => (
                        <View style={[styles.decoration,{borderColor: this.state.textcolor}]}>
                        <TouchableOpacity style={[styles.type,{borderColor:this.state.textcolor}]} onPress={()=> this.props.navigation.navigate('Musicplayer',{Name: this.state.name,data: this.state.dataSource,id: item.id,Artwork: this.state.artwork,Code:this.state.code})}>
                        <View style={{flexDirection:'row',margin: 5,alignItems:'center'}}>
                                <Image source={{uri: item.artwork}} style={styles.image1}/>
                                <View style={{flex:1,alignItems:'center',justifyContent: 'space-between',flexDirection:'row'}}>
                                <View style={{marginLeft: 10,width: 200}}>
                                    <Text style={[styles.text]}>{item.title}</Text>
                                    <Text style={[styles.text1]}>{item.artist}</Text>
                                </View>  
                                <View style={{ flexDirection: 'row',alignItems:'center',marginRight: 10}}>
                                    {/* {this.state.heart ? <Icon 
                                    onPress={()=> this.setState({
                                        heart: false
                                    })}
                                    name='heart'
                                    size={25}
                                    // color="#f6355d"
                                    color="red"
                                    /> : <Icon 
                                    onPress={()=> this.setState({
                                        heart: true
                                    })}
                                    name='heart-outline'
                                    size={25}
                                    color='black'
                                    />} */}
                                    <Icon 
                                    onPress={()=>this.props.navigation.navigate("Addtoplay",{Url:item.url,Artwork:item.artwork,Artist:item.artist,Title:item.title})}
                                    name='dots-vertical'
                                    size={25}
                                    color={this.state.textcolor}
                                    />
                                </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        </View>
                    )}
                    />
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    decoration:{
        backgroundColor:'white',
        borderRadius:10,
        margin: 10

    },
    // type:{
    //     flexDirection:'column',
    //     alignItems:'center',
    // },
    image1:{
        height: 70,
        width: 70,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        resizeMode:'stretch',
    },
    text:{
        fontSize:15,
        marginTop:5,
        marginBottom:2,
        marginLeft: 5,
        marginRight:10,
        fontWeight:'bold'
    },
    text1:{
        fontWeight:'600',
        color:'grey',
        margin: 5
    }
})