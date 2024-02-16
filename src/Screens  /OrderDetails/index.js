import { useEffect, useRef,useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { useDimensions } from "../../Context";
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import ActionSheet from "react-native-actions-sheet";
import colors from "../../colors";
import Snackbar from "react-native-snackbar";
import style from "./style";
import { View,Text,TouchableOpacity,Image,ScrollView,StyleSheet } from "react-native";
import CustomButton from "../CustomBotton";
import CustomTextInput from "../CustomTextInput";
import CustomDropDown from "../CustomDropDown";
const  OrderDetails=()=>{
    const route=useRoute()
    const [orderStatus,setOrderStatus]=useState('')
    const [status,setStatus]=useState('')
    const actionSheetRef=useRef(null)
    const{item}=route.params;
    const {height,width}=useDimensions()
const responsiveStyle=style(height,width)

    const navigation=useNavigation();
    useEffect(()=>{
        if(item)
        {
            setOrderStatus(item.orderStatus)

        }
    },[item])
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Order Details',
            headerStyle:{
                backgroundColor:'white',
                height:100,
            },
            headerTintColor:'black',
            headerLeft:()=>(<TouchableOpacity onPress={()=>navigation.goBack()}><Image source={require('../../images/arrow.png')} style={{width:25,height:25,resizeMode:'contain',marginLeft:10}}/>
            </TouchableOpacity>
                ),
                
        })
     },[navigation])
     const statusData=[{name:'Ordered'},
     {name:'Order In Progress'},
     {name:'Order Packed'},
     {name:'Order Shipped'},
     {name:'Out For Delivery'},
     {name:'Delivered'},
     {name:'Returned'},
     {name:'Failed'}]

const handleUpdateOrder=async()=>{
  
    await firestore().collection('Orders').doc(item.id).update({
        orderStatus:status,
    }).then(()=>
      {  actionSheetRef.current?.hide();
        Snackbar.show({
            text: 'order status updated',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor:'green',
            textColor:'white',
          });   
    }
    )
    setOrderStatus(status)


}
    return(
        <View>
            <ActionSheet ref={actionSheetRef}>
                <View style={{padding:15}}>
                    <View  style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontFamily:'Lato-Bold', fontSize:20,color:'black'}}>update order</Text>
                    <TouchableOpacity  onPress={()=>actionSheetRef.current?.hide()}>
                    <FontAwesome style={{marginLeft:4}} name="close" size={39}></FontAwesome>
                    </TouchableOpacity>
                    </View>
                    <View style={{marginVertical:20}}>
                    <CustomDropDown data={statusData} categoryName={orderStatus} setData={(obj)=>setStatus(obj.name)}/>
                    <CustomButton buttonText={'update order'} onPress={handleUpdateOrder}/>
                    </View>
                </View>
                
            </ActionSheet>
            <ScrollView style={{padding:15,}} contentContainerStyle={{paddingBottom:150}} showsVerticalScrollIndicator={false}>
            <View style={responsiveStyle.itemView}>
            <Feather name="box" size={40} color='white'/>
 
            <View>
                    <Text style={{color:'white',fontFamily:'Lato-Regular',fontSize:16}}>order id:IJHGFB</Text>
                    <Text style={{color:'white',fontFamily:'Lato-Black',fontSize:20}}>{orderStatus}</Text>
            </View>
            </View>
            <View style={{marginVertical:18}}>
                <Text style={{color:colors.green,fontFamily:'Lato-Bold',fontSize:20}}>Items:</Text>
                {item.cartItems.map((ele,index)=>{
                    return(
                        <View 
                        key={index} 
                        style={{flexDirection:'row',alignItems:'center',marginVertical:5}}>
                      <View style={{
                        backgroundColor:colors.green,
                        paddingVertical:15,
                        paddingHorizontal:20,
                        borderRadius:10,
                        marginRight:15,
                        }}>
                        <Text style={{color:'white',fontFamily:'Lato-Bold',fontSize:18}}>{ele.quantity}</Text>
                      </View>
                      <FontAwesome5 name="star-of-life" size={40} color='black'/>

                      <View style={{width:'60%',overflow:'hidden',marginLeft:15}}>
                      <Text style={{color:'black',fontFamily:'Lato-Regular',fontSize:18}}>{ele.name}</Text>
                      <Text style={{color:'black',fontFamily:'Lato-Regular',fontSize:15}}>{ele.description}</Text>
                      </View>
                      <View style={{width:'20%'}}>
                      <Text style={{color:'black',fontFamily:'Lato-Bold',fontSize:18}}>₹ {ele.price}</Text>
                      </View>
                        </View>
                    )
                })}
            </View>
            <View style={{marginVertical:15}}>
                <Text style={{color:colors.green,fontFamily:'Lato-Bold',fontSize:20}}>payment details</Text>
                <View style={responsiveStyle.totalView}>
                    <View>
                       <Text style={{lineHeight:25, color:'black',fontFamily:'Lato-Regular',fontSize:17}}>Bag Total</Text>
                        <Text style={{ lineHeight:25,color:'black',fontFamily:'Lato-Regular',fontSize:17}}>Coupon discount</Text>
                        <Text style={{lineHeight:25,color:'black',fontFamily:'Lato-Regular',fontSize:17}}>Delivery charge</Text>
                    </View>
                    <View style={{alignItems:'flex-end'}}>
                    <Text style={{lineHeight:25,color:'black',fontFamily:'Lato-Regular',fontSize:17}}>₹ 134</Text>
                        <Text style={{lineHeight:25,color:'red',fontFamily:'Lato-Regular',fontSize:17}}>Apply coupon</Text>
                        <Text style={{lineHeight:25,color:'black',fontFamily:'Lato-Regular',fontSize:17}}>₹ 140</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{color:'black',fontFamily:'Lato-Bold',fontSize:18}}>Total Amount</Text>
                    <Text style={{color:'black',fontFamily:'Lato-Bold',fontSize:18}}>₹ {item.totalAmount}</Text>
                </View>
            </View>
            <View style={{marginVertical:15}}>
                <Text style={{color:colors.green,fontFamily:'Lato-Bold',fontSize:20,}}>Address</Text>
                <Text style={{color:'black',fontFamily:'Lato-Regular',fontSize:16,}}>abcdefghijklmnopqrstuvwxyz</Text>
                <Text style={{color:'black',fontFamily:'Lato-Regular',fontSize:16,}}>abcdefghijklmnopqrstuvwxyz</Text>

            </View>
            <View style={{marginVertical:15}}>
                <Text style={{color:colors.green,fontFamily:'Lato-Bold',fontSize:16,}}>Payment Method</Text>
              <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center',padding:15}}>
              <FontAwesome name="cc-visa" size={30} color='black'/>
              <View style={{marginLeft:15}}>
                <Text style={{color:'black',fontFamily:'Lato-Regular',fontSize:16,}}>**** **** **** 3452</Text>
                <Text style={{color:'black',fontFamily:'Lato-Regular',fontSize:16,}}>{item.paymentMethod}</Text>

              </View>

              </View>
            </View>
        </ScrollView>
        <View style={(StyleSheet.absoluteFillObject,{bottom:90})}>
        <CustomButton
        buttonText={'update status'}
        onPress={()=>actionSheetRef.current?.show()}/>
        </View>
        </View>
    )
}
export default OrderDetails