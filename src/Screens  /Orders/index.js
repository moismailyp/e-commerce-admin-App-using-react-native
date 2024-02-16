import { useLayoutEffect,useEffect, useCallback, useState } from "react";
import { View,Text,Image,TouchableOpacity,FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import Snackbar from "react-native-snackbar";;
import CustomTextInput from "../CustomTextInput";
import { useDimensions } from "../../Context";
import EmptyData from "../../Common/EmptyData";
import moment from "moment";
import style from "./style";
const Orders =()=>{
const [orders,setOrders]=useState([])
const [searchText,setSearchText]=useState('')
const navigation=useNavigation();
const {height,width}=useDimensions()
const responsiveStyle=style(height,width)
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
            )
    })
 },[navigation])
 useFocusEffect(useCallback(()=>{
     getOrders()
 }))
const getOrders=async()=>{
    await firestore().collection('Orders').get()
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
            setOrders(objArray)
        }
    })
}
const handleSearch=async(text)=>{
    setSearchText(text)
await firestore().collection('Orders').orderBy('username').startAt(searchText).endAt(searchText+'\uf8ff').get()
.then(snapshot=>{
    if(snapshot.empty)
    {
        setUsers([])
        Snackbar.show({
            text: 'No users found',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor:'red',
            textColor:'white',
          });    
        

    }
    else
    {
        const objArray=[];
        snapshot?.docs.forEach(document=>{
            const result={id:document.id,...document?.data()}
            objArray.push(result)
        })
        setOrders(objArray)
    }
        
    })

}
const Header=()=>{
    return(
        <CustomTextInput onChangeText={(text)=>handleSearch(text)}
        placeholder={'search here...'}
        value={searchText}
        icon={<Image source={require('../../images/search.png')} style={{height:25,width:25,resizeMode:'contain'}}/>}
        />
    )
}
const dateFormat=(time)=>{
   return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')
}
const handleNavigation=(item)=>{
    navigation.navigate('OrderDetails',{item:item})
}
    return(
        <FlatList 
        data={orders}
        style={{flex:1,padding:15}}
        contentContainerStyle={{paddingBottom:100}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={()=><Header/>}
        ListEmptyComponent={()=><EmptyData/>}
        extraData={orders}
        sh
        renderItem={({item,index})=>{return(
            <TouchableOpacity onPress={()=>handleNavigation(item)} style={responsiveStyle.flatView}>
            <View style={responsiveStyle.innerView}>
                <View>
                    <Text style={responsiveStyle.orderId}>{item.orderId}</Text>
                    <Text style={responsiveStyle.orderDate}>ordered on {dateFormat(item.createdDate)}</Text>
                    <Text style={responsiveStyle.address1}>{item.address}</Text>
                    <Text style={responsiveStyle.address1}>item.address2</Text>
                    <Text style={responsiveStyle.address1}>
                        Paid:<Text style={responsiveStyle.priceText}> {item.totalAmount}</Text>  Items:<Text style={responsiveStyle.quantity}>{item.quantity}</Text>
                    </Text>
    
    
    
    
                    </View>
               <Image source={require('../../images/map.jpg')} style={responsiveStyle.mapImage}/>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',
            alignItems:'center',marginTop:15}}>
                
                    <Text style={responsiveStyle.orderStatus}>Order Shipped</Text>
                    <Text style={responsiveStyle.rateAndReview}>rate and review products</Text>
                    
            </View>
       
        </TouchableOpacity>)
        }}
        />
    )
}
export default Orders