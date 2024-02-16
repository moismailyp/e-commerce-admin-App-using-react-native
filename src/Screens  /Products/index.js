import { useState } from "react";
import { useCallback, useEffect } from "react";
import { View,Text,TouchableOpacity,Image,FlatList ,Alert} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EmptyData from "../../Common/EmptyData";
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from "../CustomTextInput";
import Snackbar from "react-native-snackbar";
import CustomSearch from "../../Common/CommonSearchBar";
import colors from "../../colors";
const Products =()=>{
    const navigation=useNavigation()
  
    const [products,setProducts]=useState([])
    const [searchText,setSearchText]=useState('')
    useFocusEffect(useCallback(()=>{
getUsers()
    },[]))
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
useEffect(()=>{
    getUsers();
},[])


const getUsers=async()=>{
    await firestore().collection('Products').get()
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
            setProducts(objArray)
        }
    })
}
const handleText=()=>{

}

const handleSearch=async text=>{
    await firestore()
    .collection('Products')
    .orderBy('name')
    .startAt(String(text))
    .endAt(String(text)+'\uf8ff').get()
    .then((res)=>{
        if(res.empty)
        {
            setProducts([])
            Snackbar.show({
                text: 'invalid orderID',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:colors.green,
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
            setProducts(snap)
        }
    })
    }
     const handleDeleteProduct=(ProductDetails)=>{
    
        Alert.alert('confirm', 'do you want to delete this product', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress:async () => firestore().collection('Products').doc(ProductDetails.id).delete().then(()=>
        {
            Snackbar.show({
                text: 'item deleted successfully',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:'red',
                textColor:'white',
              });    
getUsers();

        })
    }
    ]);
     }
     const handleEditProduct=(ProductDetails)=>{
        navigation.navigate('CreateProducts',{type:'edit',data:ProductDetails})
     }

    return(<View style={{flex:1}}>
        <CustomSearch onChangeText={handleSearch}/>
        <FlatList 
        data={products}
        style={{flex:1,margin:15}}
        contentContainerStyle={{paddingBottom:100}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={()=><EmptyData/>}
        extraData={products}
        sh
        renderItem={({item,index})=>{return(
            <View style={{flexDirection:'row',alignItems:'flex-start',alignItems:'center',
            marginVertical:8,
            borderColor:'green',
            borderWidth:1, 
            borderRadius:15,
            width:'90%',
            alignSelf:'center',

            backgroundColor:'#dadada',}}>
            <TouchableOpacity onPress={()=>navigation.navigate('ProductDetails',{product:item})}
             style={{
                padding:15,
                flexDirection:'row',
             
            }}>  
          
                <Image source={item?.image ?{uri :item.image}:require('../../images/user1.png')}
                style={{width:80,
                        height:80,
                        resizeMode:'contain',
                        overflow:'hidden',
                }}
                />
                <View style={{marginLeft:10}}>
    <Text style={{fontFamily:'Lato-Bold',fontSize:20,color:'green',lineHeight:35,overflow:'hidden'}}>{item.name}</Text>
    <Text style={{fontFamily:'Lato-Regular',fontSize:14,color:'black'}}>{item.description}</Text>
    <Text style={{fontFamily:'Lato-Bold',fontSize:20,color:'black'}}>₹{item.price}</Text>
                </View>
               
          
               
            </TouchableOpacity>
            <View style={{position:'absolute',top:5,right:5,flexDirection:"row",alignItems:'center',}}>
                <TouchableOpacity style={{marginRight:10}} onPress={()=>handleEditProduct(item)}><AntDesign color={'green'}  name="edit" size={29}/></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleDeleteProduct(item)}><AntDesign color={'red'} name="delete" size={29}/></TouchableOpacity>
            </View>
            
            </View>)
        }}
        />
        </View>
    )
}
export default Products