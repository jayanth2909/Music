import React, { Component } from 'react'
import { Text, View,Dimensions,Image,TouchableOpacity,RefreshControl,FlatList,ScrollView,StyleSheet,ActivityIndicator } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Heart from '../../assets/Icons/Heart.png'
import Recently from '../../assets/Icons/recently.jpg'
import Firebase from '../Firebase'
import axios from 'axios'

const width = Dimensions.get('window').width

var playlist=[]
export default class Mix5 extends Component {

    constructor(props){
        super(props);
        this.state = {
          day:'',
          bdcolor:'',
          textcolor:'',
          artwork: 'https://forum.byjus.com/wp-content/themes/qaengine/img/default-thumbnail.jpg',
          dataSource:null,
          loading: true,
        }
      }
    
      componentDidMount(){
        axios.get("https://music-application-ftd.000webhostapp.com/DailyMix/day5.php")
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
        <ScrollView style={{backgroundColor:this.state.bdcolor,flex:1}}
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}>
               <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
               <Image style={{height: 250,width: '100%',borderBottomLeftRadius: 50,borderBottomRightRadius: 50}}
                  source={{
                  uri:
                      "https://firebasestorage.googleapis.com/v0/b/ftd-play-music.appspot.com/o/7.png?alt=media&token=97c82a61-dfa6-49ec-9b10-dafc23d62bec",
                  }}
                  resizeMode="stretch" />
                      <View style={{alignItems:'center',margin: 10,marginLeft:20}}>
                          <TouchableOpacity style={{height: 45,width: 100,backgroundColor:'red',alignItems:'center',justifyContent:'center',borderRadius: 10,}} onPress={()=> this.props.navigation.navigate('Musicplayer',{Name: this.state.name,data: this.state.dataSource,id: 1,Artwork: this.state.artwork,Code:this.state.code})}>
                              <Text style={{color:'white',fontSize: 20,fontWeight:'bold'}}>Play</Text>
                          </TouchableOpacity>
                      </View>
               </View>
      
        {this.state.dataSource==null ?
                <View style={{justifyContent:'center',alignItems:'center',marginTop: 200}}>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={this.state.textcolor}/>
                    </View>
                    <Text style={{color:this.state.textcolor}}>Fetching Data</Text>
                </View>
                :
                <View>
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
                                    onPress={()=> alert("sadkjhkj")}
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
        </ScrollView>
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
