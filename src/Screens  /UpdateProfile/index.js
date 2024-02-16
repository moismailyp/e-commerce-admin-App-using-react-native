import React,{useLayoutEffect,useCallback,useState, useRef,useEffect} from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../CustomBotton';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import CustomTextInput from '../CustomTextInput';
import CustomDropDown from '../CustomDropDown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheet from "react-native-actions-sheet";
import Snackbar from "react-native-snackbar";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { useRoute } from '@react-navigation/native';
import uploadImage from '../../Common/storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../Store/action';
export const UpdateProfile = () => {
    const actionSheetRef=useRef(null)
    const navigation=useNavigation();
    const [categories,setCategories]=useState([])
    const [uploadUri,setUploadUri]=useState(null)
    const [username,setUserName]=useState('')
    const dispatch=useDispatch()
    const [mobileNumber,setMobileNumber]=useState(null) 
    const userId=useSelector(state=>state.userId)
    const [email,setEmail]=useState('')   
    const [qun,setQun]=useState(0)
    const route=useRoute();
    const{data,type}=route.params;
    const [price,setPrice]=useState('')

    console.warn(userId)
     useEffect(()=>{
        
       setUserName(data.username)
        setEmail(data.email)
        setMobileNumber(data.mobileNumber)
            setUploadUri(data.image)
        },[data])
        useLayoutEffect(()=>{
        navigation.setOptions({
            title:type==='create'?'update admin':'Edit Product',
            headerStyle:{
                backgroundColor:'white',
                height:100,
            },
            headerTintColor:'black',
            headerLeft:()=>(<TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image source={require('../../images/arrow.png')} 
            style={{width:25,
            height:25,
            resizeMode:'contain',marginLeft:10}}/>
            </TouchableOpacity>
                ),
                
        })
     },[navigation])
     useFocusEffect(useCallback(()=>{
    }))

    const handleCamera= async()=>
    {
        const options={
            mediaType:'photo'
        }
         await launchCamera(options,(response)=>{
            actionSheetRef.current.hide();
            if(response&&response.assets)
            {
                setUploadUri(response?.assets[0]?.uri)
                console.warn(uploadUri);
            }
        }
        
        );
    }
    const handleGallery=async()=>
    {
        const options={
            mediaType:'photo'
        }
     await launchImageLibrary(options,(response)=>{
            actionSheetRef.current.hide();
            if(response&&response.assets)
            {
                setUploadUri(response?.assets[0]?.uri)
            }

        }
        
        );
    }
  
  const handleUpdateUser=async()=>{
        if(uploadUri&&
            username!==''&&
            email!==''&&
            mobileNumber!=='')
        {
         const responseUri= uploadUri.includes('file://')?uploadUri: await uploadImage(uploadUri);
     
         const product ={
            username:username,
            email:email,
            profileImage:responseUri,
            mobileNumber:mobileNumber,

         }
         await firestore().collection('Users').doc(userId).update(product).then(()=>{
            Snackbar.show({
                text: 'change saved',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'green',
                textColor:'white',
              });  
              dispatch(updateProfile({
                username:username,
                mobileNumber:mobileNumber,
                profileImage:responseUri,
                email:email,
            }))  

              navigation.goBack()
        })

        }
        else
        {
            Snackbar.show({
                text: 'do not leave any fields empty',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'green',
                textColor:'white',
              });  
        }

    }
  return (
   <ScrollView style={{padding:15}} showsVerticalScrollIndicator={false} >
      <ActionSheet ref={actionSheetRef}>
                <View style={{padding:15}}>
                <View  style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontFamily:'Lato-Bold', fontSize:20,color:'black',lineHeight:55}}>select options</Text>
                <TouchableOpacity  onPress={()=>actionSheetRef.current?.hide()}>
                <FontAwesome style={{marginLeft:4}} name="close" size={39}></FontAwesome>
                </TouchableOpacity>
                </View>
                <View style={{paddingBottom:100,padding:20,alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
                    <TouchableOpacity onPress={handleGallery} style={{alignItems:'center',justifyContent:'center'}}>
                <Entypo name="image" size={40} color={'black'} />
                <Text style={{fontFamily:'Lato-Bold', fontSize:20,color:'black',lineHeight:55}}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCamera}style={{alignItems:'center',justifyContent:'center'}}>
                <Entypo name="camera" size={40} color={'black'} />
                <Text style={{fontFamily:'Lato-Bold', fontSize:20,color:'black',lineHeight:55}}>Camera</Text>
                </TouchableOpacity>
                </View>
                </View>
                
            </ActionSheet>
<CustomTextInput
value={email}
 placeholder={'email'}
 onChangeText={text=>{setEmail(text)}}
 />
 <CustomTextInput
 placeholder={'username'}
 value={username}
 onChangeText={text=>{setUserName(text)}}
 />
 <CustomTextInput
 placeholder={'phoneNumber'}
 value={mobileNumber}
 onChangeText={text=>{setMobileNumber(text)}}
 />

 {categories.length>0?<CustomDropDown data={categories} categoryName={type==='edit'?data.categoryName:categories[0].name} edit={true} setData={obj=>setCategory(obj)}/>:null}
 <TouchableOpacity onPress={()=>actionSheetRef.current?.show()}
  style={{justifyContent:'center',alignItems:'center',padding:15,marginVertical:10,borderWidth:1,borderRadius:8}}>
 <Text style={{color:'black',fontSize:18,fontFamily:'Lato-Regular'}}>upload  image</Text>

    {uploadUri?(<View><TouchableOpacity
    style={{position:'absolute',
zIndex:9,
right:0,
top:-10,
backgroundColor:'white',
borderRadius:25,
overflow:'hidden',
}}
     onPress={()=>setUploadUri(null)}>
        
        <AntDesign
    name="closecircleo"
    size={25}
    color={'black'}/>
    </TouchableOpacity>
        <Image style={{width:100,height:100,resizeMode:'contain'}} source={{uri :uploadUri}} /></View>):(<Entypo name="images" size={40} color={'black'} />)}
 </TouchableOpacity>
        <CustomButton
        buttonText={type==='create'?'create a product':'save changes'}
        onPress={handleUpdateUser}/>
        </ScrollView>

  )
}
export default UpdateProfile;