import { TextInput } from "react-native";
import { Image,View,Text } from "react-native";
import colors from "../../colors";
const CustomTextInput=props=>{
    const {type,placeholder,onChangeText,icon,secureTextEntry,value,check,multiline}=props;
const keyboardType=type==='email'?'email-address':type==='password'?'default':'default'
return(
    <View style={{
    flexDirection:icon?'row':check?'row':'column',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'space-between',
    borderWidth:1,
    borderColor:'green',
    borderRadius:10,
    width:'90%',
    paddingHorizontal:10,
    padding:15,
    marginVertical:10,
    }}>
        <TextInput
        style={{color:'black',fontFamily:'Lato-Regular',fontSize:16,height:multiline?75:'default',textAlign:'left'}}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            multiline={true}
            value={value}
            onChangeText={(text)=>onChangeText(text)}/>
      {check?<Text style={{fontFamily:'Lato-Regular',color:colors.green,fontSize:19}}>check</Text>:null}
        {icon?icon:null}
    </View>
)
}
export default CustomTextInput;