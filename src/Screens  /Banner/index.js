import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { useCallback, useEffect,useState,useRef } from "react"
import { View,Text,TouchableOpacity,Image, FlatList, ImageBackground,Alert } from "react-native"
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useDimensions } from "../../Context";
import CustomButton from "../CustomBotton";
import ActionSheet from "react-native-actions-sheet";
import Snackbar from "react-native-snackbar";
import CustomTextInput from "../CustomTextInput";
import uploadImage from "../../Common/storage";
import { act } from "react-test-renderer";
const Banner=()=>{
    const actionSheetRef=useRef(null)
    const navigation=useNavigation()
    const{height,width}=useDimensions()
    const [banners,setBanners]=useState([])
    const [uploadUri,setUploadUri]=useState('')
    const [bannerHead,setBannerHead]=useState('')
    const [bannerDesc,setBanerDesc]=useState('')
    const [bannerId,setBannerId]=useState('')

    const [type,setType]=useState(null)
    useEffect(()=>{
        navigation.setOptions({
            title:'Banners',
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
             <TouchableOpacity onPress={()=>{setType('add'),actionSheetRef.current.show()}}>
                <AntDesign style={{marginLeft:4}} name="plussquareo" size={39}/>
             </TouchableOpacity>
         )
      }
     },[navigation])

     useFocusEffect(useCallback(()=>{
getBanners()
     }))
     const getBanners=async()=>{
        await firestore().collection('Banners').get()
        .then(snapshot=>{
            if(snapshot.empty)
            {
            }
            else
            {
                const objArray=[];
                snapshot?.docs.forEach(document=>{
                    const result={id:document.id,...document?.data()}
                    objArray.push(result)
                })
                setBanners(objArray)
            }
        })
    }
       const handleCreateBanner=async()=>{
        if(uploadUri&&
            bannerDesc!==''&&
            bannerHead!=='')
        {
         const responseUri=  await uploadImage(uploadUri)
         const Banner ={
            created:Date.now(),
            updated:Date.now(),
            bannerHead:bannerHead,
            bannerDescription:bannerDesc,
            image:responseUri,
         }
         await firestore().collection('Banners').add(Banner).then(()=>{
            Snackbar.show({
                text: 'Banner added',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'green',
                textColor:'white',
              });  
        setBanerDesc('')
        setBannerHead('')
        setUploadUri(null)
    })
    actionSheetRef.current.hide();

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
    const handleCamera= async()=>
    {
        const options={
            mediaType:'photo'
        }
         await launchCamera(options,(response)=>{
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
            if(response&&response.assets)
            {
                setUploadUri(response?.assets[0]?.uri)
            }

        }
        
        );
    }
    const handleDeleteBanner=(ProductDetails)=>{
    
        Alert.alert('confirm', 'do you want to delete this product', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress:async () => firestore().collection('Banners').doc(ProductDetails.id).delete().then(()=>
        {
            Snackbar.show({
                text: 'item deleted successfully',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'red',
                textColor:'white',
              });    


        })
    }
    ]);
     }
    const handleEditBanner=(item)=>{
        setBannerHead(item.bannerHead)
        setBanerDesc(item.bannerDescription)
        setUploadUri(item.image)
        setBannerId(item.id)
        setType('update')
        actionSheetRef.current.show();
    }

        const handleUpdateBanner=async()=>{
            if(uploadUri&&
                bannerDesc!==''&&
                bannerHead!=='')
            {
             const responseUri= uploadUri.includes('file://')?uploadUri: await uploadImage(uploadUri);
             const Banner ={
                updated:Date.now(),
                bannerHead:bannerHead,
                bannerDescription:bannerDesc,
                image:responseUri,
             }
             await firestore().collection('Banners').doc(bannerId).update(Banner).then(()=>{
                Snackbar.show({
                    text: 'Banner updated',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor:'green',
                    textColor:'white',
                  });  
            actionSheetRef.current.hide();
            setBanerDesc('')
            setBannerHead('')
            setUploadUri(null)
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
    return(
        <View style={{flex:1}}>
                      <ActionSheet ref={actionSheetRef}>
                <View style={{padding:10}}>
                    <View  style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontFamily:'Lato-Bold', fontSize:20,color:'black'}}>{type==='add'?'Create Banner':'Edit Banner'}</Text>
                    <TouchableOpacity  onPress={()=>actionSheetRef.current?.hide()}>
                    <FontAwesome style={{marginLeft:4}} name="close" size={39}></FontAwesome>
                    </TouchableOpacity>
                    </View>
                    <View style={{marginVertical:20}}>
                    <CustomTextInput
                      placeholder={'Banner Head'}
                      value={bannerHead}
                      onChangeText={text=>{setBannerHead(text)}}
                    />
                      <CustomTextInput
                      placeholder={'Banner Description'}
                      value={bannerDesc}
                      multiline={true}
                      onChangeText={text=>{setBanerDesc(text)}}
                    /> 
                     <TouchableOpacity onPress={()=>actionSheetRef.current?.show()}
  style={{justifyContent:'center',alignItems:'center',padding:15,marginVertical:10,borderWidth:1,borderRadius:8}}>
 <Text style={{color:'black',fontSize:18,fontFamily:'Lato-Regular'}}>upload product image</Text>

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
 <View style={{paddingBottom:10,padding:20,alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
                    <TouchableOpacity onPress={handleGallery} style={{alignItems:'center',justifyContent:'center'}}>
                <Entypo name="image" size={40} color={'black'} />
                <Text style={{fontFamily:'Lato-Bold', fontSize:20,color:'black',lineHeight:55}}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCamera}style={{alignItems:'center',justifyContent:'center'}}>
                <Entypo name="camera" size={40} color={'black'} />
                <Text style={{fontFamily:'Lato-Bold', fontSize:20,color:'black',lineHeight:55}}>Camera</Text>
                </TouchableOpacity>
                </View>
                    <CustomButton buttonText={type==='add'?'create Banner':'update banner'} onPress={type==='add'?handleCreateBanner:handleUpdateBanner}/>
                    </View>
                </View>
                
            </ActionSheet>
            <FlatList data={banners}
            contentContainerStyle={{alignSelf:'center'}}
            renderItem={({item,index})=>{
            return(
                <ImageBackground 
                source={{uri :item.image}} 
                style={{width:width*0.95,
                    height:height*0.2,
                    resizeMode:'cover',
                    borderRadius:10,
                    marginTop:10,
                    overflow:'hidden'}}>
                        <View style={{padding:20}}>
                        <Text style={{color:'black',fontSize:20,fontFamily:'Lato-Black'}}>{item.bannerHead}</Text>
                        <Text style={{color:'black',fontSize:14,fontFamily:'Lato-Regular',marginTop:10}}>{item.bannerDescription}</Text>
                        </View>
                        <View style={{position:'absolute',top:5,right:5,flexDirection:"row",alignItems:'center',backgroundColor:'white'}}>
                <TouchableOpacity style={{marginRight:10}} onPress={()=>handleEditBanner(item)}><AntDesign color={'green'}  name="edit" size={29}/></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleDeleteBanner(item)}><AntDesign color={'red'} name="delete" size={29}/></TouchableOpacity>
            </View>
                        </ImageBackground>
            )
        }}/></View>
    )
}
export default Banner;