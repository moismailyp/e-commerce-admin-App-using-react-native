import { useState } from "react";
import { View,Text,Image, ScrollView, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore';
import CustomButton from "../CustomBotton";
import Snackbar from "react-native-snackbar";
import CustomTextInput from "../CustomTextInput";
import { validateEmail } from "../../Common/validation";
import { useDispatch } from "react-redux";
import { login } from "../../Store/action";
const Login=()=>{
    const [secureTextEntry,setSecureTextEntry]=useState(false)
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()

    const handleLogin=async()=>{
        if(username.trim()==='Admin@gmail.com'&&password.trim()==='1234')
        {
        if(validateEmail(username))
        {
        
            await firestore()
            .collection('Users')
            .where('email','==',username.trim())
            .get()
            .then(async snapshot=>{
                if (!snapshot.empty)
                {  snapshot.forEach(snapshotData=>{
                    const snapdata=  snapshotData.data()
                    if(password.trim()===snapdata.password)
                    { 
                    const id=snapshotData.id;

                      dispatch(login({
                        userId:id,
                        username:snapdata.username,
                        mobileNumber:snapdata.mobileNumber,
                        profileImage:snapdata.profileImage,
                        email:snapdata.email,
                    }))  
                        Snackbar.show({
                        text: 'login success',
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor:'green',
                        textColor:'white'
                      });                                   
                    }
                    else
                    {
                        Snackbar.show({
                            text: 'wrong password',
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor:'#000',
                            textColor:'red'
                          });
                    }
                })
                }

            })
            .catch((error)=>console.warn(error))
        }
    
    else{
        Snackbar.show({
            text: 'enter valid email',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor:'#000',
            textColor:'#fff'
          });
        }

    }
    else{
        Snackbar.show({
            text: 'only admin has authority',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor:'#000',
            textColor:'#fff'
          });

    }

    }
  
   
 
    const handleSecureTextEntry=()=>{
setSecureTextEntry(!secureTextEntry)
    }
    return(
        <View>
            <Image source={require('../../images/tobBg.jpg')}style={{width:'100%',height:150}}></Image>
            <ScrollView style={{
                marginTop:-25,
                borderTopLeftRadius:15,
                borderTopRightRadius:15,
                backgroundColor:'#fff'}}>
                <Image source={require('../../images/brand.jpg')}style={{width:300,height:150,resizeMode:'contain',alignSelf:'center'}}></Image>
                <Text style={{fontFamily:'Lato-Bold',fontSize:18,textAlign:'center',marginBottom:20,color:'black'}}>Admin Login</Text>
                <CustomTextInput  onChangeText={(text)=>setUsername(text)} placeholder={'email'} icon={<Image source={require('../../images/email.png')} style={{height:25,width:25,resizeMode:'contain'}}/>} />
                <CustomTextInput onChangeText={(text)=>setPassword(text)} secureTextEntry={secureTextEntry}  placeholder={'password'} icon={<TouchableOpacity onPress={handleSecureTextEntry}><Image source={secureTextEntry?require('../../images/hide.png'):require('../../images/view.png')} style={{height:25,width:25,resizeMode:'contain'}}/></TouchableOpacity>} />
                <CustomButton buttonText={'login'} onPress={handleLogin}/>
            </ScrollView>
        </View>
    )
}
export default Login