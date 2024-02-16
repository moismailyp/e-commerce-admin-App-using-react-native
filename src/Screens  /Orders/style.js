import { StyleSheet } from "react-native";
import colors from "../../colors";
const style=(height,width,isPortrait)=>StyleSheet.create({
container:{
    flex:1,
    
},
flatView:{
    backgroundColor:colors.seconderyGreen,
    borderRadius:15,
    padding:15,
    overflow:'hidden',
    margin:15
},
innerView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomColor:'black',
    borderBottomWidth:1,
    paddingBottom:15
},
orderId:
{
    fontFamily:'Lato-Bold',fontSize:16,color:'black'
},
orderDate:{
    fontFamily:'Lato-Regular',
    fontSize:14,
    color:colors.green
},
address1:
{
    fontFamily:'Lato-Bold',
    fontSize:14,
    color:'#dadada'
},
priceText:{
    fontFamily:'Lato-Bold',
    fontSize:16,
    color:colors.green
},
mapImage:{
    width:100,
    height:100,
    borderRadius:50,
    overflow:'hidden',
    resizeMode:'contain'
},
quantity:{fontFamily:'Lato-Bold',fontSize:16,color:colors.green
},
orderStatus:{
    fontFamily:'Lato-Bold',fontSize:16,color:'black'
},
rateAndReview:{fontFamily:'Lato-Bold',fontSize:16,color:'black'}
})
export default style;