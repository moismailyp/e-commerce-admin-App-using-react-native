import { useNavigation } from "@react-navigation/native";
import { useCallback, useLayoutEffect,useState,useEffect, useRef, } from "react";
import { View,Text, FlatList,TouchableOpacity,Image,Alert,c } from "react-native";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import CustomButton from "../CustomBotton";
import colors from "../../colors";
import firestore, { firebase } from '@react-native-firebase/firestore';
import ActionSheet from "react-native-actions-sheet";
import Snackbar from "react-native-snackbar";
import style from "./style";
import { useDimensions } from "../../Context";
import CustomTextInput from "../CustomTextInput";
import Clipboard from '@react-native-community/clipboard';
const  Offers=()=>{
    const navigation=useNavigation()
    const {height,width,isPortrait}=useDimensions()
    const responsiveStyle=style(height,width,isPortrait)
    const [offers,setOffers]=useState([])
    const [offer,setOffer]=useState('')
    const [header,setHeader]=useState('')
    const [selected,setSelected]=useState(null)
    const [subHeader,setSubHeader]=useState('')
    const [offerCode,setOfferCode]=useState('')
    const [type,setType]=useState('')
    const actionSheetRef=useRef(null)
    const actionSheetRefOptions=useRef(null)

    useLayoutEffect(useCallback(()=>{
        getOffers()
    }))
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
             <TouchableOpacity onPress={()=>{actionSheetRef.current.show(),setType('add')}}>
                <AntDesign style={{marginLeft:4}} name="plussquareo" size={39}/>
             </TouchableOpacity>
         )
      }
     },[navigation])
    const getOffers=async()=>{
        await firestore().collection('Offers').get()
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
                setOffers(objArray)
            }
        })
    }
    const handleCreateOffer=async()=>{
        if(offer!==''&&
        offerCode!==''&&
        header!==''&&setSubHeader!=='')
{        const offerObject={
            offer:offer,
            offerCode:offerCode,
            head:header,
            subHead:subHeader,
        }
        await firestore().collection('Offers').add(offerObject).then(()=>{
            Snackbar.show({
                text: 'offer headed',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'green',
                textColor:'white',
              }); 
          
              
                   })
                   actionSheetRefOptions.current.hide() 

                   getOffers();
                }
        else
        {
            Snackbar.show({
                text: 'dont leave any field empty',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'green',
                textColor:'white',
              }); 

        }
        
        
    }
    const handleEditOffer=async()=>{
        actionSheetRefOptions.current.hide();
        setTimeout(()=>{
            setHeader(selected.head)
            setSubHeader(selected.subHead)
            setOffer(selected.offer)
            setOfferCode(selected.offerCode)
            setType('edit')
    actionSheetRef.current.show();
        },1000)
    
    }
    const handleUpdateOffer=async()=>{
        if(header&&
            subHeader!==''&&
            offer!==''&&offerCode!=='')
        {
            const offerObject={
                offer:offer,
                offerCode:offerCode,
                head:header,
                subHead:subHeader,
            }
         
         await firestore().collection('Offers').doc(selected.id).update(offerObject).then(()=>{

    actionSheetRef.current.hide();


            Snackbar.show({
                text: 'Offer updated',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'green',
                textColor:'white',
              });  
              setHeader('')
              setSubHeader('')
              setOffer('')
              setOfferCode('')
              setType('')

    })
    actionSheetRef.current.hide();

}
        }
    const handleDeleteOffer=()=>{
    
        Alert.alert('confirm', 'do you want to delete this product', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress:async () => firestore().collection('Offers').doc(selected.id).delete().then(()=>
        {
            Snackbar.show({
                text: 'item deleted successfully',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'red',
                textColor:'white',
              });    
actionSheetRefOptions.current.hide();

        })
    }
    ]);
     }
    const handleCopyOffer=()=>{
actionSheetRefOptions.current.hide();
setTimeout(()=>{
    Clipboard.setString(selected.offerCode)
},1000)
    }
    return(
        <View style={{flex:1}}>
              <ActionSheet ref={actionSheetRef}>
                <View style={{padding:15}}>
                    <View  style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontFamily:'Lato-Bold', fontSize:20,color:'black'}}>{type==='edit'?'edit offer':'create offer'}</Text>
                    <TouchableOpacity  onPress={()=>{actionSheetRef.current?.hide(),setType(null),setSelected(null)}}>
                    <FontAwesome style={{marginLeft:4}} name="close" size={39}></FontAwesome>
                    </TouchableOpacity>
                    </View>
                    <View style={{marginVertical:20}}>
                    <CustomTextInput
value={header}
 placeholder={'offer head'}
 onChangeText={text=>{setHeader(text)}}
 />
 <CustomTextInput
 placeholder={'sub head'}
 value={subHeader}
 onChangeText={text=>{setSubHeader(text)}}
 />
 <CustomTextInput
 placeholder={'offer code'}
 value={offerCode}
 onChangeText={text=>{setOfferCode(text)}}
 />
 <CustomTextInput
 placeholder={'offer'}
 value={offer}
 onChangeText={text=>{setOffer(text)}}
 />
<CustomButton buttonText={type==='edit'?'update order':'create offer'} onPress={type==='edit'?handleUpdateOffer:handleCreateOffer}/>
</View>
</View>
</ActionSheet>
    <ActionSheet ref={actionSheetRefOptions}>
        <View style={{padding:15}}>
            <View  style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontFamily:'Lato-Bold', fontSize:20,color:'black'}}>update order</Text>
                    <TouchableOpacity  onPress={()=>actionSheetRefOptions.current?.hide()}>
                    <FontAwesome style={{marginLeft:4}} name="close" size={39}></FontAwesome>
                    </TouchableOpacity>
                    </View>
                    <View style={{margin:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between',}}>
                    <TouchableOpacity onPress={handleDeleteOffer}><AntDesign color={'red'} name="delete" size={29}/></TouchableOpacity>  
                    <TouchableOpacity onPress={handleEditOffer}><AntDesign color={'red'} name="edit" size={29}/></TouchableOpacity>  
                    <TouchableOpacity onPress={handleCopyOffer}><AntDesign color={'red'} name="copy1" size={29}/></TouchableOpacity>  
                    </View>
                </View>      
            </ActionSheet>
         <FlatList data={offers} keyExtractor={(item,index)=>String(index)}contentContainerStyle={responsiveStyle.contentStyle} showsVerticalScrollIndicator={false}   renderItem={({item,index})=>{
                    return(
                        <TouchableOpacity onPress={()=>{
                            setSelected(item)
                            actionSheetRefOptions.current.show()
                        }} style={responsiveStyle.renderView}>
                    <View style={ responsiveStyle.offCircleView}>
                       <View style={responsiveStyle.abc}></View>
                       <View style={responsiveStyle.abc}></View>
                     <View style={responsiveStyle.abc}></View>
                    <View style={responsiveStyle.abc}></View>
                </View>
                
                <View style={{width:'65%',height:100,backgroundColor:'#dadada',padding:20}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontFamily:'Lato-Bold',color:colors.greenTop,fontSize:50}}>{item.offer}</Text>
                        <View>
                            <Text style={{fontFamily:'Lato-Regular',color:colors.greenTop,fontSize:16}}>%</Text>
                            <Text style={{fontFamily:'Lato-Regular',color:colors.greenTop,fontSize:16}}>Off</Text>
                        </View>
                        <View style={{padding:20}}>
                        <Text style={{fontFamily:'Lato-Bold',color:'black',fontSize:16}}>{item.head}</Text>
                        <Text style={{fontFamily:'Lato-Bold',color:'black',fontSize:12}}>{item.subHead}</Text>
                        </View>

                    </View>
                </View>
                <View style={{justifyContent:'space-between',height:100,backgroundColor:'#dadada'}}>
                <View style={{width:25,height:25,borderRadius:25/2,backgroundColor:'white',marginTop:-25/2}}></View>
                    <View style={{width:25,height:25,borderRadius:25/2,backgroundColor:'white',marginBottom:-25/2}}></View>
                </View>
                <View style={{width:'25%',height:100,backgroundColor:'#dadada',justifyContent:'center',alignItems:'center',paddingVertical:15,paddingRight:15}}>
                    <Text style={{fontFamily:'Lato-Bold',color:'black',fontSize:12}}>useCode</Text>
                    <View style={{marginVertical:10,padding:5,justifyContent:'center',borderRadius:15,backgroundColor:'black',overflow:'hidden'}}>
                        <Text style={{fontFamily:'Lato-Regular',color:'white',fontSize:14,textAlign:'center'}}>{item.offerCode}</Text>
                    </View>
                </View>
                {/* end design */}
                <View style={{marginLeft:-25/2}}>
                    <View style={responsiveStyle.abc}></View>
                    <View style={responsiveStyle.abc}></View>
                    <View style={responsiveStyle.abc}></View>
                    <View style={responsiveStyle.abc}></View>
                </View>
                </TouchableOpacity>  
                    )
                }}></FlatList>
        </View>
    )
}
export default Offers 