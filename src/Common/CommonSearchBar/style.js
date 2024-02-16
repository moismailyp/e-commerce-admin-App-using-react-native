import { StyleSheet } from "react-native";
import colors from "../../colors";
 const style=(height,width)=>
({
    container:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
    },
    search:{
        borderWidth:1,
        borderColor:'black',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        padding:12,
        width:width*.85
    },
    newStyle:{
        borderWidth:1,
        borderColor:'black',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        padding:12,
        width:width*0.65,

    },
    newContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginVertical:15,
    },
    searchIcon:{
        width:25,
        height:25,
        resizeMode:'contain',
    },
    micIcon:{
        width:25,
        height:25,
        resizeMode:'contain',
    },
    textInput:{
        fontFamily:'Lato-Regular',
        fontSize:19,
        marginLeft:10,
        flex:1
    },
    innerView:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:4,
    

    },
    filter:{
        fontFamily:'Lato-Regular',
        fontSize:19,
        marginLeft:10,
        color:colors.green,
    }

})
export default style