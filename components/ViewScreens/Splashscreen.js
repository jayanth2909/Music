import React from 'react' 
import {View,Text,Image} from 'react-native'
import Firebase from '../Firebase'
import Asyncstorage from '@react-native-community/async-storage'
import applogo from '../../assets/applogo1.png'

export default class Splashscreen extends React.Component{

    constructor(props){
        super(props)
        this.state={
            email:''
        }
    }

    _storedata = async (user) => {
        
        try{
            await Asyncstorage.setItem("User",user);
        }catch(err){
            console.log(err)
        }
    }

    _getdata= async () => {
        try{
            var value = await Asyncstorage.getItem("User")
            if(value!=null){
                console.log(value)
                return value
            }
        }catch(err){
            console.log(err)
        }
    }


    componentDidMount(){
        
        try{
        Firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.props.navigation.navigate("Bottomnav")
                this._storedata(user.email)
                console.log("dsfkghdsfkg")
            }
            else{
                this.props.navigation.navigate("MainPage")
            }
            console.log(data)
        })
        }catch(err){
            console.log(err)
        }
        
    }

    
    render(){
        return(
            <View style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:'#ffe0f0'}}>
                <Image source={applogo} style={{height:250,width:250}}/>
            </View>
            )
    }
}