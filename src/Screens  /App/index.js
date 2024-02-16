import React, { useEffect,useState } from "react";
import { View,Text } from "react-native"
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../Home";
import Login from "../Login";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DimensionContextProvider } from "../../Context";
import { Provider, useSelector } from "react-redux";
import { store } from "../../Store/store";
import CustomDrawer from "../CustomDrawer"; 
import CustomFooter from "../CustomFooter";
import Profile from "../Profile";
import Products from "../Products";
import Orders from "../Orders";
import Splash from "../Splash";
import Users from "../Users";
import ProductDetails from "../ProductDetail";
import OrderDetails from "../OrderDetails";
import CreateProducts from "../CreateProducts";
import Banner from "../Banner";
import Offers from "../Offers";
import UpdateProfile from "../UpdateProfile";
import Review from "../Review";
const Stack = createNativeStackNavigator();

const App=()=>{
  return(
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  )
}
const AppNavigator=()=>{
  const [loading,setLoading]=useState(true)
  const isLoggedIn=useSelector(state=>state.isLoggedIn)
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },3000)
  })
    return(
        <DimensionContextProvider> 
        <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false}}>
      {loading? (<Stack.Screen name="Splash" component={Splash}/>):
        (<>{!isLoggedIn?<Stack.Screen name="Login" component={Login}/>
        :<Stack.Screen name="SideBar" component={SideBar}/>}</>)}
        </Stack.Navigator>
        </NavigationContainer>
        </DimensionContextProvider>
    
      );
    }
    const Tab = createBottomTabNavigator();
    const Footer=()=>{
    return (
        <Tab.Navigator
         screenOptions={{headerTitleAlign:'left',headerShown:false}}
        tabBar={props=><CustomFooter {...props}/>}
        initialRouteName="Home">
        <Tab.Screen name="StackNav" component={StackNav}/>
     
        </Tab.Navigator>
      );
    }
    const StackNavigator = createNativeStackNavigator();

    const StackNav=()=>{
      return(
        <StackNavigator.Navigator screenOptions={{headerTitleAlign:'left'}} >
        <StackNavigator.Screen name="Home" component={Home}/>
        <StackNavigator.Screen name="Products" component={Products}/>
        <StackNavigator.Screen name="Orders" component={Orders}/>
        <StackNavigator.Screen name="Profile" component={Profile}/>
        <StackNavigator.Screen name="Users" component={Users}/>
        <StackNavigator.Screen name="OrderDetails" component={OrderDetails}/>
        <StackNavigator.Screen name="ProductDetails" component={ProductDetails}/>
        <StackNavigator.Screen name="CreateProducts" component={CreateProducts}/>
        <StackNavigator.Screen name="Banner" component={Banner}/>
        <StackNavigator.Screen name="Offers" component={Offers}/>
        <StackNavigator.Screen name="UpdateProfile" component={UpdateProfile}/>
        <StackNavigator.Screen name="Review" component={Review}/>
        </StackNavigator.Navigator>
      )
    }
    const Drawer = createDrawerNavigator();
    const SideBar=()=>{
    return(

        <Drawer.Navigator screenOptions={
          {
            headerShown:false,
          }
        } drawerContent={props=><CustomDrawer {...props}/>} >
          <Drawer.Screen name="Footer" component={Footer}/>
        </Drawer.Navigator>
      );
    }


export default App;