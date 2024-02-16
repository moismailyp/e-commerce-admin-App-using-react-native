import { View,Image,Text } from "react-native";
import { useDimensions } from "../../Context";
import style from "./style";
import { TextInput } from "react-native-gesture-handler";

const CustomSearch=({filter,placeholder,onChangeText})=>
{
    const {height,width}=useDimensions()
    const responsiveStyle=style(height,width)
    return(
        <View style={filter==='filter'?responsiveStyle.newContainer:responsiveStyle.container}>
            <View style={filter==='filter'?responsiveStyle.newStyle:responsiveStyle.search}>
                <View style={responsiveStyle.innerView}>
                <Image style={responsiveStyle.searchIcon} source={require('../../images/search.png')}/>
                <TextInput placeholder={'search here'} placeholderTextColor={'black'}
                style={responsiveStyle.textInput}
                onChangeText={(text)=>onChangeText(text)}
                ></TextInput>
               
                </View >
                </View>
              {filter==='filter'?<Text style={responsiveStyle.filter}>filter</Text>:null}
                </View>
    )
}
export default CustomSearch