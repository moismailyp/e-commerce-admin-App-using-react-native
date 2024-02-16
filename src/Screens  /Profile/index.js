import { useLayoutEffect,useState,useEffect, useCallback } from "react";
import { View,Text,TouchableOpacity,Image } from "react-native";
import CustomSearch from "../../Common/CommonSearchBar";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";
import CustomButton from "../CustomBotton";
import { firebase } from "@react-native-firebase/firestore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
const  Profile=()=>{
    const navigation=useNavigation()
const username=useSelector(state=>state.username)
const email=useSelector(state=>state.email)
const phoneNumber=useSelector(state=>state.phoneNumber)
const profileImage=useSelector(state=>state.profileImage)
const userId=useSelector(state=>state.userId)

const [userDetails,setUserDetails]=useState([])
const [userData,setUserData]=useState([])

    useEffect(()=>{
        
        navigation.setOptions({
            title:'Products',
            headerStyle:{
                backgroundColor:'white',
                height:100,
            },
            headerTintColor:'black',
            headerLeft:()=>(<TouchableOpacity onPress={()=>navigation.goBack()}><Image source={require('../../images/arrow.png')} style={{width:25,height:25,resizeMode:'contain',marginLeft:10}}/>
            </TouchableOpacity>
                ), headerRight:()=><RightComponent/>,
        })
        const RightComponent =()=>{
         return(
             <TouchableOpacity onPress={()=>navigation.navigate('CreateProducts',{type:'create'})}>
                <AntDesign style={{marginLeft:4}} name="plussquareo" size={39}/>
             </TouchableOpacity>
         )
      }
     },[navigation])
     useFocusEffect(useCallback(()=>{
      getProducts()
     }))
const getProducts=async()=>{
   await firestore().collection('Users').where('email','==',email).get()
   .then(snapdata=>{
    if(!snapdata.empty)
{
let Obj=[]
    snapdata.docs.forEach(docs=>{
const result=(docs.data())
Obj.push(result)
})
setUserDetails(Obj)

}
})
   

}
    

    return(
        <View style={{flex:1,padding:20}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <View style={{height:150,width:150,borderRadius:120,backgroundColor:'white',
                alignItems:'center',justifyContent:'center'}}>
                <Image style={{height:150,width:150,borderRadius:120}} source={profileImage!==''?{uri :profileImage}:require('../../images/user.png')}/>
                </View>
                <View style={{marginTop:20,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:'Lato-Bold',color:'black',fontSize:24,lineHeight:35}}>{username}</Text>
                    <Text style={{fontFamily:'Lato-Regular',color:'green',fontSize:16,lineHeight:35}}>{email}</Text>

                </View>
                <CustomButton onPress={()=>navigation.navigate('UpdateProfile',{data:userDetails[0],type:'edit'})} buttonText={'update Profile'}/>
            </View>
           
        </View>
    )
}
export default Profile