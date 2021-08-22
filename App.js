import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from'@react-navigation/stack'
import MainPage from './components/Login Screens/mainpage'
import SignIn from './components/Login Screens/Signin'
import SignUp from './components/Login Screens/Signup'
import Next1 from './components/Login Screens/nextbtn'
import Home from './components/MainScreens/Home'
import Search from './components/MainScreens/search'
import Library from './components/MainScreens/library'
import Account from './components/MainScreens/account'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Music_player from './components/ViewScreens/Music_play'
import TrackPlayer from 'react-native-track-player'
import Typescreen from './components/ViewScreens/TypeView/Typescreens'
import Viewscreen from './components/ViewScreens/TypeView/viewscreen'
import Musicplayer from './components/ViewScreens/MusicPlay'
import SplashScreen from './components/ViewScreens/Splashscreen'
import Recent from './components/MainScreens/Recent'
import Liked from './components/MainScreens/Liked'
import AddItem from './components/MainScreens/AddItem'
import Dailymix1 from './components/Dailymix/Mix1'
import Dailymix2 from './components/Dailymix/Mix2'
import Dailymix3 from './components/Dailymix/Mix3'
import Dailymix4 from './components/Dailymix/Mix4'
import Dailymix5 from './components/Dailymix/Mix5'
import Playlist from './components/MainScreens/Playlist'
import Addtoplay from './components/MainScreens/Addtoplay'

const Tab  = createBottomTabNavigator();

function Bottomnav(){
    return (
      <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        inactiveTintColor: 'gray',
        activeTintColor: '#ff5b77',
        showLabel: false,
        tabStyle: {
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 12,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'folder-search' : 'folder-search-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Musicplayer"
        component={Musicplayer}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'view-dashboard' : 'view-dashboard-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'view-dashboard' : 'view-dashboard-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'account' : 'account-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
    );
}


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="MainPage" component={MainPage} options={{headerShown: false}}/>
        <Stack.Screen name="Sigin" component={SignIn} options={{headerShown: false}}/>
        <Stack.Screen name="Sigup" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Next" component={Next1} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Bottomnav" component={Bottomnav} options={{headerShown: false}}/>
        <Stack.Screen name="Music_player" component={Music_player} options={{headerShown: false}} />
        <Stack.Screen name="Typescreen" component={Typescreen} options={{headerShown: false}} />
        <Stack.Screen name="Viewscreen" component={Viewscreen} options={{headerShown: false}} />
        <Stack.Screen name="Musicplayer" component={Musicplayer} options={{headerShown: false}} />
        <Stack.Screen name="Recent" component={Recent} options={{headerShown: false}} />
        <Stack.Screen name="LikedMusic" component={Liked} options={{headerShown: false}} />
        <Stack.Screen name="AddItem" component={AddItem} options={{headerShown: false}} />
        <Stack.Screen name="Dailymix1" component={Dailymix1} options={{headerShown: false}} />
        <Stack.Screen name="Dailymix2" component={Dailymix2} options={{headerShown: false}} />
        <Stack.Screen name="Dailymix3" component={Dailymix3} options={{headerShown: false}} />
        <Stack.Screen name="Dailymix4" component={Dailymix4} options={{headerShown: false}} />
        <Stack.Screen name="Dailymix5" component={Dailymix5} options={{headerShown: false}} />
        <Stack.Screen name="Playlist" component={Playlist} options={{headerShown: false}} />
        <Stack.Screen name="Addtoplay" component={Addtoplay} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
{/*
import {View,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from'@react-navigation/stack'
import MainPage from './components/Login Screens/mainpage'
import SignIn from './components/Login Screens/Signin'
import SignUp from './components/Login Screens/Signup'
import Next1 from './components/Login Screens/nextbtn'
import Home from './components/MainScreens/Home'
import Search from './components/MainScreens/search'
import Library from './components/MainScreens/library'
import Account from './components/MainScreens/account'
import Music_player from './components/ViewScreens/Music_play'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen name="MainPage" component={MainPage} options={{headerShown: false}}/>
        <Stack.Screen name="Sigin" component={SignIn} options={{headerShown: false}}/>
        <Stack.Screen name="Sigup" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Next" component={Next1} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Music_player" component={Music_player} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;*/}