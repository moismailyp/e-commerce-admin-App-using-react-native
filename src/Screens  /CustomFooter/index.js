import { View,Text,Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from "@react-navigation/native";

export default function CustomFooter(){
const navigation =useNavigation();

const [active,setActive]=useState('')
const handleNavigation=(name)=>{
    navigation.navigate(name)
    setActive(name)
}
    return(
        <View style={{height:80,
            backgroundColor:'green',
            padding:15,
            borderTopLeftRadius:15,
            borderTopRightRadius:15,
            overflow:'hidden',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around',
        
        }}>
            <TouchableOpacity onPress={()=>handleNavigation('Home')}>
                <Image source={require('../../images/whome.png')} style={{
                    width:active==='Home'?20:15,
                    height:active==='Home'?20:15,
                    resizeMode:'contain',
                    alignSelf:'center',
                    marginBottom:4}}></Image>
                <Text style={{fontSize:16,color:'white',fontFamily:active==='Home'?'Lato-Bold':'Lato-Reguler'}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation('Products')}>
            <Image source={require('../../images/wproduct.png')} 
            style={{ width:active==='Products'?20:15,
            height:active==='Products'?20:15,
                    resizeMode:'contain',
                    alignSelf:'center',
                    marginBottom:4}}></Image>
                <Text style={{fontSize:16,color:'white',fontFamily:active==='Products'?'Lato-Bold':'Lato-Reguler'}}>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation('Orders')}>
            <Image source={require('../../images/worders.png')} style={{
                     width:active==='Orders'?20:15,
                     height:active==='Orders'?20:15,
                    resizeMode:'contain',
                    alignSelf:'center',
                    marginBottom:4}}></Image>
                <Text style={{fontSize:16,color:'white',fontFamily:active==='Orders'?'Lato-Bold':'Lato-Reguler'}}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation('Profile')}>
            <Image source={require('../../images/wprofile.png')} style={{
                    width:active==='Profile'?20:15,
                    height:active==='Profile'?20:15,
                    resizeMode:'contain',
                    alignSelf:'center',
                    marginBottom:4}}></Image>
                <Text style={{fontSize:16,color:'white',fontFamily:active==='Profile'?'Lato-Bold':'Lato-Reguler'}}>Profile</Text>
            </TouchableOpacity>

        </View>
    )
}
