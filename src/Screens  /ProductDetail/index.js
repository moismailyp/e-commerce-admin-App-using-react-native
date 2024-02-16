import { useEffect ,useRef,useState} from "react";
import { useNavigation } from "@react-navigation/native";
import ActionSheet from "react-native-actions-sheet";
import { useRoute } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Accordion from 'react-native-collapsible/Accordion';
import style from "./style";
import { View,Text,TouchableOpacity,Image,ScrollView } from "react-native";
import { useDimensions } from "../../Context";
import CustomTextInput from "../CustomTextInput";
const  ProductDetails=()=>{
    const navigation=useNavigation();
    const route=useRoute()
    const {height,width}=useDimensions()
    const responsiveStyle=style(height,width)
    const [currentActiveSections,setActiveSection]=useState([])
    const actionSheetRef=useRef();
    const {product}=route.params;
    useEffect(()=>{
        navigation.setOptions({
            title:'Description',
            headerStyle:{
                backgroundColor:'white',
                height:100,
            },
            headerTintColor:'black',
            headerLeft:()=>(<TouchableOpacity onPress={()=>navigation.goBack()}><Image source={require('../../images/arrow.png')} style={{width:25,height:25,resizeMode:'contain',marginLeft:10}}/>
            </TouchableOpacity>
                ),
                headerRight:()=><RightComponent/>
        })
     },[navigation])
     const RightComponent =()=>{
        return(
            <TouchableOpacity onPress={()=>navigation.navigate('CreateProducts',{type:'edit',data:product})}>
            <FontAwesome style={{marginLeft:4}} name="edit" size={39}></FontAwesome>
            </TouchableOpacity>
        )
     }

     const detailsArray=[
        {
            title:'Manufacturer Details',
            content:' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it',
        },
        {
            title:'product disclaimer',
            content:' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it'
        },
        {   title:'features & Details ',
            content:' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it'    
        },
    ]
    const renderHeader=(sections)=>{
        return(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={responsiveStyle.descriptionHead}>{sections.title}</Text>
                <AntDesign name="down" size={25} color={'#dadada'}/>
            </View>
        )

    }
    const renderContent=(sections)=>{
        return(
            <View><Text style={responsiveStyle.description}>{sections.content}</Text></View>
        )
    }
    const updateSections=(currentActiveSections)=>{
       setActiveSection(currentActiveSections)
    }

    return(
        <ScrollView style={{flex:1}}>
            <View style={{padding:15}}>
            <Image source={{uri:product.image}} style={{width:'100%',height:200,resizeMode:'contain'}}/>
            </View>
            <View style={{flex:1,backgroundColor:'white',padding:15}}>
                <Text style={{fontFamily:'Lato-Bold',color:'black',fontSize:22,lineHeight:45}}>{product.name}</Text>
             <Text style={{fontFamily:'Lato-Bold',color:'black',fontSize:22}}>₹{product.price}{' '}<Text style={{fontFamily:'Lato-Bold',color:'green',fontSize:22}}>25% Off</Text></Text>
             <View style={{borderBottomWidth:1,borderBottomColor:'#dadada',paddingVertical:10}}>
                <Text style={responsiveStyle.descriptionHead}>Product details</Text>
                <Text style={responsiveStyle.description}>{product.description}</Text>
                </View>
             <Accordion
    activeSections={currentActiveSections}
    sections={detailsArray}
    // renderSectionTitle={renderSectionTitle}
    renderHeader={renderHeader}
    renderContent={renderContent}
    onChange={updateSections}
    underlayColor={"transparent"}
    sectionContainerStyle={{paddingVertical:10,borderBottomColor:'#dadada',borderBottomWidth:1,marginLeft:10}}
    paddingVertical
  />
          <View style={{padding:15}}>
            <Text style={{fontFamily:'Lato-Bold',fontSize:18,marginBottom:10}}>Check Delivery</Text>
            <Text style={responsiveStyle.commonText}>Enter Pincode to check delivery date/pickup option</Text>
            <CustomTextInput type={''} handleText={()=>console.warn(pincode)} check={true} placeholder={'pincode'}/>
            <Text style={responsiveStyle.commonText}>free delivery on orders above 200</Text>
            <Text style={responsiveStyle.commonText}>Cash on delivery available</Text>
            <Text style={responsiveStyle.commonText}>Easy 21 days return and exchange</Text>

        </View>


            </View>
        </ScrollView>
    )
}
export default ProductDetails