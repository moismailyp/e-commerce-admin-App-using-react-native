import { StyleSheet } from "react-native";
import colors from "../../colors";
const style=(height,width,isPortrait)=>StyleSheet.create({
    container:{flex:1},
    itemView:
    {
        backgroundColor:colors.green,
        borderRadius:15,
        marginVertical:15,
        padding:15,
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center',       
    },totalView:{
        justifyContent:'space-between',
                marginVertical:15,
                flexDirection:'row',
                alignItems:'center',
                paddingBottom:20,
                borderBottomColor:'black',
                borderBottomWidth:1}
    
})
export default style