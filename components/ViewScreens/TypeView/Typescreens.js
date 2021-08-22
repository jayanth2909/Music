import React from 'react'
import {View,Text,FlatList,TouchableOpacity,Image,StyleSheet,ActivityIndicator,Dimensions,ImageBackground} from 'react-native'
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'


const width  = Dimensions.get('window').width

export default class Typescreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          day:'',
          bdcolor:'',
          textcolor:'',
          dataSource:null,
          loading: true
        }
      }
      

    render(){
    
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

        const name = this.props.route.params.Name  
        const bg = this.props.route.params.Image  
        axios.get("https://music-application-ftd.000webhostapp.com/Categories/"+name+".php")
            .then(response => {
                setTimeout(() => {
                    this.setState({
                    dataSource: response.data,
                    lodaing : false
                    })
                }, 2000) 
            })
            .catch(error => {
                console.log(error);
                alert(error)
            });
        return (
        <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor:this.state.bdcolor,flex:1}}>
            {this.state.dataSource==null ?
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={this.state.textcolor}/> 
                    </View>
                    <Text>Fetching Data</Text>
                </View>
                :<View>
                   <View style={{height: 65,width:width,backgroundColor:this.state.textcolor,borderBottomRightRadius:10,borderBottomLeftRadius:10,justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}>
                     <Ionicons name="backburger" onPress={()=>this.props.navigation.pop()} size={28} color={this.state.bdcolor} style={{marginLeft: 10}}/>
                    <Text style={{color:this.state.bdcolor,fontSize: 23,fontWeight:'bold',marginLeft: 20}}>{name}</Text>
                  </View>
                    <FlatList
                      keyExtractor = {(item) => item.id}
                      data = {this.state.dataSource}
                      renderItem = {({item}) => (
                            <View  style={{borderColor: this.state.textcolor,width:width-20,margin:10,borderRadius:10,backgroundColor:"#f2f2f2"}}>
                              <TouchableOpacity style={{borderColor:this.state.textcolor,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} onPress={()=> this.props.navigation.navigate('Viewscreen',{Name: item.title,Artwork: item.artwork,Code:name})}>
                                   <Image source={bg} style={{height:150,width:180,resizeMode:'cover',borderTopLeftRadius:10,borderBottomLeftRadius:10}}/>
                                  <Image source={{uri: item.artwork}} style={{height:150,width:150,marginRight:10}}/>
                              </TouchableOpacity>
                            </View>
                      )}
                      />
                  </View>
                  }
              {/* {this.state.loading &&
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={this.state.textcolor} />
                </View>
                } */}
        </View>
        )
    }
}
const styles = StyleSheet.create({
    decoration:{
        width: 162,
        margin: 5,
        marginBottom: 10,
        borderWidth:1,
        borderColor:'black',
        borderRadius:10

    },
    type:{
        flexDirection:'column',
        alignItems:'center',
    },
    image1:{
        height: 160,
        width: 160,
        resizeMode:'stretch',
        borderRadius: 10
    },
    text:{
        textAlign:'center',
        fontSize:15,
        marginTop:5,
        marginBottom:5,
        marginLeft:10,
        marginRight:10
    }
})