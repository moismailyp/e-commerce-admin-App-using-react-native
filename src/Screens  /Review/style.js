import { StyleSheet } from "react-native";
const style=(height,width,isPortarait)=>StyleSheet.create({
container:{
    padding:15
},image:{
    width:50,
    height:50,
    resizeMode:'contain',
    overflow:'hidden',
    borderRadius:25,
},
reviewBox:{padding:15,backgroundColor:'white',borderRadius:8,marginVertical:10}

})
export default style