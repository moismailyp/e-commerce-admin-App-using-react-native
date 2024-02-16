import { useState } from "react";
import { useEffect, useLayoutEffect } from "react";
import { View,Text,Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
const Home =()=>{
    const navigation=useNavigation()
    const [orders,setOrders]=useState(0)
    const [products,setProducts]=useState(0)
    const [users,setUsers]=useState(0)
     useEffect(()=>{
    navigation.setOptions({
        title:'Home',
        headerStyle:{
            backgroundColor:'white',
            height:115,
        },
        headerTintColor:'black',
        headerLeft:()=>(<TouchableOpacity onPress={()=>navigation.openDrawer()}><Image source={require('../../images/social.png')} style={{width:50,height:50,resizeMode:'contain',marginLeft:10}}/>
        </TouchableOpacity>
            )
    })
},[navigation])
useEffect(()=>{
    getAllCount();
})
const getAllCount=async()=>{
    const productsRef=await firestore().collection('Products').get();
    const userRef=await firestore().collection('Users').get()
    const orderRef= await firestore().collection('Orders').get()

setOrders(orderRef.size);
setProducts(productsRef.size)
setUsers(userRef.size)
}
    return(
        <View style={{flex:1}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Orders')}
            style={{
                width:'95%',
                height:'25%',
                borderRadius:15,
                backgroundColor:'#ADD8E6',
                alignSelf:'center',
                alignItems:'center',
                padding:15,
                flexDirection:'row',
                justifyContent:'flex-start',
                marginVertical:8,
            }}>
<Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../../images/billboard.png')}/>
<View style={{marginLeft:10}}><Text style={{fontFamily:'Lato-Bold',fontSize:32,color:'black'}}>{orders} </Text>
<Text style={{fontFamily:'Lato-Regular',fontSize:20,color:'black'}}>orders</Text></View>

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Products')}
            style={{
                width:'95%',
                height:'25%',
                padding:15,
                borderRadius:15,
                backgroundColor:'#fefebe',
                alignSelf:'center',
                alignItems:'center',
                flexDirection:'row',
                justifyContent:'flex-start',
                marginVertical:8,

}}>
                <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../../images/marketing-automation.png')}/>
<View style={{marginLeft:10}}><Text style={{fontFamily:'Lato-Bold',fontSize:32,color:'black'}}>{products} </Text>
<Text style={{fontFamily:'Lato-Regular',fontSize:20,color:'black'}}>products</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Users')}
            style={{
                width:'95%',
                height:'25%',
                borderRadius:15,
                backgroundColor:'#F5F5DC',
                padding:15,
                alignSelf:'center',
                alignItems:'center',
                flexDirection:'row',
                justifyContent:'flex-start',
                marginVertical:8,
            }}>
                                <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../../images/sale.png')}/>

<View style={{marginLeft:10}}><Text style={{fontFamily:'Lato-Bold',fontSize:32,color:'black'}}>{users} </Text>
<Text style={{fontFamily:'Lato-Regular',fontSize:20,color:'black'}}>users</Text></View>
            </TouchableOpacity>
        
     

        </View>
    )
}
export default Home