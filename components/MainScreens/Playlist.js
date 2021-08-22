import React from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image,ActivityIndicator,Dimensions,RefreshControl} from 'react-native'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Firebase from '../Firebase'


var img_data =[]
var data=[]

class PlayList extends React.Component {


    constructor(props){
        super(props)
        this.state={
            Name:'',
            Date: '',
            Artwork: 'https://forum.byjus.com/wp-content/themes/qaengine/img/default-thumbnail.jpg',
            Username:'',
            refreshing:false

        }
    }
    _onRefresh = () => {
        this.setState({refreshing:true})
        Firebase.database().ref().child("Playlist").child(this.state.Name).on('value',function(data){
            img_data=[]
            var count=0
            data.forEach((item,key)=>{
                var feed= {
                    title:item.val().Title,
                    artwork:item.val().Artwork,
                    artist:item.val().Artist,
                    url:item.val().Url,
                    id: count+=1
                }
                img_data.push(feed)
            })
        })
        this.setState({refreshing:false})
    }



    componentDidMount(){
        const Name = this.props.route.params.Name
        const Date1 = this.props.route.params.Date
        const Image  = this.props.route.params.Image
        const Username  = this.props.route.params.Username
        this.setState({
            Name:Name,
            Date:Date1,
            Artwork:Image,
            Username:Username
        })
        Firebase.database().ref().child("Playlist").child(Name).on('value',function(data){
            img_data=[]
            var count=0
            data.forEach((item,key)=>{
                var feed= {
                    title:item.val().Title,
                    artwork:item.val().Artwork,
                    artist:item.val().Artist,
                    url:item.val().Url,
                    id: count+=1
                }
                img_data.push(feed)
            })
        })
    }

  render() {
    return (
      <View style={{backgroundColor:'#ececec',flex:1}}>
        <View style={{backgroundColor:"white",borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
            <View style={{justifyContent:'center',alignItems:'center',margin:20}}>
            <Image source={{
            uri:this.state.Artwork
            }} style={{height:150,width:150,borderRadius:10}}/>
            <Text style={{fontSize:15,fontWeight:'bold',marginTop:10}}>{this.state.Name} - {this.state.Username}</Text>
            </View>
        </View>
        {img_data==null ?
                <View style={{justifyContent:'center',alignItems:'center',marginTop: 200}}>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="black"/>
                    </View>
                    <Text>Fetching Data</Text>
                </View>
                :
                <View>
                <FlatList
                    horizontal={false} showsVerticalScrollIndicator={false}
                    keyExtractor = {(item) => item.id}
                    data = {img_data}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
                    renderItem = {({item}) => (
                        <View style={[styles.decoration,{borderColor: this.state.textcolor}]}>
                        <TouchableOpacity style={[styles.type,{borderColor:this.state.textcolor}]} onPress={()=> this.props.navigation.navigate('Musicplayer',{Name: this.state.Name,data: img_data,id: item.id,Artwork: this.state.Artwork,Code:this.state.Name})}>
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

export default PlayList

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