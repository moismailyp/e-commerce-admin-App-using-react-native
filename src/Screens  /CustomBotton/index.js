import { TouchableOpacity,Text,View,Image } from "react-native"

const CustomButton=(props)=>{
    const {onPress,buttonText}=props;
    return(
        <TouchableOpacity
        onPress={onPress}
        style={{
            alignSelf:'center',
            width:'85%',
            padding:20,
            borderRadius:38,
            backgroundColor:'green',
            justifyContent:'center',
            alignItems:'center',
            marginVertical:15,
        }}>
            <Text style={{fontFamily:'Lato-Bold',fontSize:18,color:'white'}}>{buttonText}</Text></TouchableOpacity>

    )
}
export default CustomButton;