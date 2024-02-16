import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity, View,Text,Image, StyleSheet, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { signout } from "../../Store/action"
import colors from "../../colors"

export default function CustomDrawer(){
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const username=useSelector(state=>state.username)
    const email=useSelector(state=>state.email)
    const profileImage=useSelector(state=>state.profileImage)


    const handleTouch=(item)=>{
        if(item.navigation)
        {
            navigation.navigate(item.navigation)
        }
        else
        {
            item.onPress();
        }
    }
    const handleSignout=()=>{
        dispatch(signout())
    }
    const contents=[{
            itemId:0,
            itemName:'Home',
            navigation:'Footer',
            icon:require('../../images/home.png')
        },
        {
            itemId:1,
            itemName:'Profile',
            navigation:'Profile',
            icon:require('../../images/product.png')
        },
        {
            itemId:2,
            itemName:'Categories',
            onPress:handleSignout,
            icon:require('../../images/categories.png')
        },
        {
            itemId:3,
            itemName:'Offers',
            navigation:'Offers',
            icon:require('../../images/orders.png')
        },
        {
            itemId:4,
            itemName:'Review',
            navigation:'Review',
            icon:require('../../images/reviews.png')
        },
        {
            itemId:5,
            itemName:'Banners',
            navigation:'Banner',
            icon:require('../../images/banners.png')
        },
        {
            itemId:6,
            itemName:'Logout',
            onPress:handleSignout,
            icon:require('../../images/logout.png')
        },]
    return(
<ScrollView>
    <View style={{paddingTop:25,
        marginTop:20,
        paddingBottom:10,
        borderBottomWidth:StyleSheet.hairlineWidth,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'}}>
            <View  style={{width:80,height:80,
                borderRadius:50,backgroundColor:'white',padding:25,justifyContent:'center',alignItems:'center'}}>
                               <Image style={{height:80,width:80,borderRadius:50}} source={profileImage!==''?{uri :profileImage}:require('../../images/user.png')}/>
</View>
            <View style={{marginLeft:10}}>
    <Text style={{fontFamily:'Lato-Bold',fontSize:18,color:'black'}}>{username}</Text>
    <Text style={{fontFamily:'Lato-Regular',fontSize:15,color:'black'}}>{email}</Text>
    </View>
    </View>
        <View style={{marginTop:20}}>
            {contents.map((item,index)=>{
            return(
                     
                <TouchableOpacity
                onPress={()=>handleTouch(item)}
                 key={String(item.itemId)}
                style={{padding:10,
                    marginVertical:5,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    borderBottomWidth:StyleSheet.hairlineWidth,
                }}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'flex-start',
                        alignItems:'center',
                      }}>
                    <Image source={item.icon} style={{width:15,
                        height:15,
                        width:15,
                        resizeMode:'contain',
                        marginRight:15,
                        }}/>
                    <Text style={{fontFamily:'Lato-Regular',fontSize:16,color:'black'}}>{item.itemName}</Text>
                    </View>
                    <Image source={require('../../images/right-arrow.png')} style={{width:15,
                        height:15,
                        width:15,
                        resizeMode:'contain',
                        marginRight:15,
                        }}/>
         
                </TouchableOpacity>
          
            )
        })}
        </View>
        <View style={{marginVertical:55}}>
        <Image style={{width:130,height:60,resizeMode:'contain',alignSelf:'center'}} source={require('../../images/brand.jpg')}></Image>
        </View>
         </ScrollView>
    )
}