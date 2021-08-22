import React, { Component } from 'react';
import { View, Text ,Button,Image,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import Applogo from '../../assets/applogo.png'
import Firebase from '../Firebase'


export default class Signin extends Component {

  constructor(props) {
    super(props);
    this.state={
        email:'',
        password:''
    }
  }
  SignIn=(email,password) =>{
      try{
          Firebase
          .auth()
          .signInWithEmailAndPassword(email,password)
          .then(user => {
              console.log(user)
              this.props.navigation.navigate("Bottomnav")
          })
      }catch(err){
          console.log(err)
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.applogo} source={Applogo}/>
        <Text style={styles.subtitle}>Sign in using Email</Text>
        <View style={styles.inputs}>
            <View style={styles.textinput1}>
                <TextInput 
                    style={styles.input}
                    placeholder="Email Id..."
                    placeholderTextColor="grey"
                    keyboardType='email-address'
                    underlineColorAndroid='transparent'
                    onChangeText={(value)=>{
                        this.setState({
                            email:value
                        })
                    }}
                    />
            </View>
            <View style={styles.textinput2}>
                <TextInput 
                    style={styles.input}
                    placeholder="Password..."
                    placeholderTextColor="grey"
                    secureTextEntry={true}onChangeText={(value)=>{
                        this.setState({
                            password:value
                        })
                    }}
                    />
            </View>
        </View>
        <View style={{marginTop: 50}}>
        <TouchableOpacity onPress={()=>this.SignIn(this.state.email,this.state.password)}>
                <View style={styles.loginbtn}>
                    <Text style={styles.text}>Login</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{marginTop: 30,flexDirection:'row'}}>
            <Text style={{color:'white',fontSize: 15}}>Don't have an Acoount? </Text>
            <Text onPress={()=>this.props.navigation.navigate("Sigup")} style={{color:'white',fontSize: 15}}>Sign Up</Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#000',
        alignItems:'center',
        justifyContent:'center'
    },
    applogo:{
        height: 150,
        width: 150,
        borderRadius: 20,
        marginBottom: 20
    },
    subtitle:{
        color:'white',
        fontSize: 25,
        marginRight: 30,
        marginLeft: 30,
        textAlign:'center',
        marginTop: 50,
        fontWeight:'bold'
    },
    inputs:{
        marginTop: 50,
    },  
    textinput1:{
        height: 60,
        width: 250,
        backgroundColor:'white',
        borderRadius:10
    },
    textinput2:{
        marginTop: 20,
        height: 60,
        width: 250,
        backgroundColor:'white',
        borderRadius:10
    },
    input:{
        color:'black',
        height: 50,
        width: 200,
        fontSize: 15,
        marginLeft: 20,
        justifyContent:'center',
        flex:1
    },
    loginbtn:{
        height: 50,
        width: 150,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 10
    },
    text:{
        fontSize: 20,
        fontWeight:'bold',
    }
})


