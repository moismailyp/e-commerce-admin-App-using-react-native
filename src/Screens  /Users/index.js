import { useLayoutEffect,useEffect, useCallback, useState } from "react";
import { View,Text,Image,TouchableOpacity,FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import Snackbar from "react-native-snackbar";
import CustomTextInput from "../CustomTextInput";
import EmptyData from "../../Common/EmptyData";
import CustomSearch from "../../Common/CommonSearchBar";
const  Users=()=>{
    const navigation=useNavigation()
    const [users,setUsers]=useState([])
    const [searchText,setSearchText]=useState('')



    
    useEffect(()=>{
   navigation.setOptions({
       title:'Users',
       headerStyle:{
           backgroundColor:'white',
           height:100,
       },
       headerTintColor:'black',
       headerLeft:()=>(<TouchableOpacity onPress={()=>navigation.goBack()}><Image source={require('../../images/arrow.png')} style={{width:25,height:25,resizeMode:'contain',marginLeft:10}}/>
       </TouchableOpacity>
           )
   })
},[navigation])

useEffect(()=>{
    getUsers();
},[])
const getUsers=async()=>{
    await firestore().collection('Users').get()
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
            setUsers(objArray)
        }
    })
}


const BlockUser=({data})=>
{
    
    return(
        <TouchableOpacity
        onPress={()=>handleBlockUser(data)} 
        style={{
            position:"absolute",
            top:5,
            right:15,
            padding:4,
            borderRadius:10,
            borderColor:data?.active ?'green':'red',
            borderWidth:1}}>
        <Text
        style={{
            fontFamily:'Lato-Bold',
            fontSize:20,
            color:data?.active?'green':'red',
        }}>{data?.active?'block':'unblock'}</Text>
        </TouchableOpacity>
    )
}

const handleSearch=async text=>{
    await firestore()
    .collection('Users')
    .orderBy('username')
    .startAt(String(text))
    .endAt(String(text)+'\uf8ff').get()
    .then((res)=>{
        if(res.empty)
        {
            setUsers([])
            Snackbar.show({
                text: 'invalid orderID',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'green',
                textColor:'white'
              });
        }
        else
        {
            let snap=[];
            res?.docs.forEach(doc=>{
    
                const result={id:doc.id,...doc?.data()}
                snap.push(result)
            })
            setUsers(snap)
        }
    })
    }
const handleBlockUser=async(data)=>{

  await firestore().collection('Users').doc(data.id).update({
    active: data?.active ?false:true,
  }).then(()=>{
    const updatedUsers=users.map(obj=>{
        if(obj?.id===data?.id)
        {
            obj.active=data?.active ?false:true;
        }
        return obj

    })
    Snackbar.show({
        text: 'user status updated',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:'green',
        textColor:'white',
      });   
      setUsers(updatedUsers)

  })



}

    return(
        <View style={{flex:1}}>
        <CustomSearch onChangeText={handleSearch}/>

    <FlatList 
    data={users}
    style={{flex:1,margin:15}}
    contentContainerStyle={{paddingBottom:100}}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={()=><EmptyData/>}
    extraData={users}
    sh
    renderItem={({item,index})=>{return(
        <View style={{
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            marginVertical:8,
            borderRadius:15,
            width:'90%',
            backgroundColor:'#dadada',
            alignSelf:'center'
        }}>
            <Image source={item?.profileimage ?{uri :item.profileimage}:require('../../images/user1.png')}
            style={{width:80,
                    height:80,
                    resizeMode:'contain',
                    borderRadius:40,
                    overflow:'hidden',
            }}
            />
            <View style={{marginLeft:10}}>
<Text style={{fontFamily:'Lato-Bold',fontSize:20,color:'black',lineHeight:35}}>{item.username}</Text>
<Text style={{fontFamily:'Lato-Regular',fontSize:14,color:'black'}}>{item.email}</Text>
<Text style={{fontFamily:'Lato-Regular',fontSize:14,color:'black'}}>{item.mobilenumber}</Text>
            </View>
            <BlockUser data={item} />
           
        </View>)
    }}
    />
    </View>
    )
}
export default Users