import { View,Text } from "react-native"
export default function EmptyData(){
    return(
        <View style={{
            marginVertical:8,
            borderRadius:15,
            padding:10,
            width:'95%',
            backgroundColor:'#dadada'
        }}>
            <Text style={{fontFamily:'Lato-Bold',fontSize:20,color:'black'}}>No Result Found</Text>
        </View>
    )
}