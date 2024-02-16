import { StyleSheet } from "react-native";
const style=(height,width,isPortrait)=>StyleSheet.create({
    main:{
        flex:1,
    },
    container:{
        backgroundColor:'white'
    },
    contentStyle:{alignSelf:'center',marginVertical:height*0.015
},
renderView:{
    flexDirection:'row',
    alignItems:'center',
    width:width,
    alignSelf:'center',
    justifyContent:'center',
    marginBottom:height*0.015,
},
offCircleView:
    {
    marginRight:-height*0.015,
    zIndex:99
},
abc:
{
    width:25,
    height:25,
    borderRadius:25/2,
    backgroundColor:'white'
}
})
export default style;