import React, { Component } from 'react'
import { View, Text ,Button,Image,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import Applogo from '../../assets/applogo.png'
import Firebase from '../Firebase'

export default class Nextbtn extends Component {


    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:'',
            username:''
        }
      }
    
    componentDidMount(){
        const email = this.props.route.params.email;
        const password = this.props.route.params.password
        this.setState({
            email:email,
            password:password
        })
        
      }

      Siginup=(email,password,username)=>{
          try{
            Firebase
              .auth()
              .createUserWithEmailAndPassword(email,password)
              .then(user => {
                  console.log(user)
                  var email1 = email.split("@").join("_")
                  var email2 = email1.split(".").join("-")
                  console.log(email2.toLowerCase())
                  Firebase.database().ref().child("UserDetails").child(email2.toLowerCase()).set({
                      Email:email,
                      Username:username
                  })
                  this.props.navigation.navigate("Bottomnav")
              })
          }catch(err){
              console.log(err.toString(err))
          }
      }



  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.applogo} source={Applogo}/>
        <Text style={styles.subtitle}>What will be your name?</Text>
        <View style={styles.textinput1}>
                <TextInput 
                    style={styles.input}
                    placeholder="Username..."
                    placeholderTextColor="grey"
                    maxLength={8}
                    onChangeText={(value)=>{
                        this.setState({
                            username:value
                        })
                    }}
                    />
            </View>
        <View style={{marginTop: 50}}>
        <TouchableOpacity onPress={()=>this.Siginup(this.state.email,this.state.password,this.state.username)}>
                <View style={styles.loginbtn}>
                    <Text style={styles.text}>Create Account</Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
    )
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
        marginBottom: 20,
    },
    subtitle:{
        color:'white',
        fontSize: 25,
        marginRight: 30,
        marginLeft: 30,
        textAlign:'center',
        marginTop: 50,
        fontWeight:'bold',
        marginBottom: 20
    },
    inputs:{
        marginTop: 50
    },  
    textinput1:{
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
        width: 200,
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


