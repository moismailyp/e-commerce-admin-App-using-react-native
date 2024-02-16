import { useEffect,useRef,useState } from "react";
import { Text,View,Image,TouchableOpacity, ScrollView } from "react-native";
import { useDimensions } from "../../Context";
import { useNavigation } from "@react-navigation/native";
import style from "./style";
import colors from "../../colors";
import ActionSheet from "react-native-actions-sheet";
const Review=(props)=>{
    const {height,width}=useDimensions();
    const [rating,setRating]=useState (0)
    const responsiveStyle=style(height,width)
    const navigation=useNavigation();
    const ActionSheetRef=useRef(null)

    const optionActionSheet=()=>
    {
        ActionSheetRef.current.show();
    }
    return(
        <ScrollView showsVerticalScrollIndicator={false} style={responsiveStyle.container}>
    
   <View style={responsiveStyle.reviewBox} >
   <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
             <Image style={responsiveStyle.image} source={require('../../images/prof.png')}/>
             <View>
             <Text style={{color:'black',fontFamily:'Lato-Bold',fontSize:18,marginLeft:10}}>ismail</Text>
             </View>
         </View>
     <Text style={{color:'black',fontFamily:'Lato-Regular',fontSize:12}}>
      
     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
     </Text>
   </View>
   <ActionSheet ref={ActionSheetRef}>
    <View style={{padding:20}}><Text style={{fontFamily:'Lato-Regular',fontSize:16}}>write a Review</Text>
    </View>
   </ActionSheet>
        </ScrollView>

    )
}
export default Review;