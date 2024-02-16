import React from "react";
import { View,Text,Image } from "react-native";
export default function Splash(){
    return(    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
       <Image style={{width:250,height:250,resizeMode:'contain',alignSelf:'center'}}
        source={require('../../images/tobBg.jpg')} />
    </View>)}
