import storage from "@react-native-firebase/storage"
import RNFetchBlob from "rn-fetch-blob"
import { Platform } from "react-native"
const uploadImage=path=>{
return new Promise(async resolve=>{
    try{
        const uri=path;
        const fileName=uri.substring(uri.lastIndexOf('/')+1);
        const pathForFirebaseStorage=await getPathForfirebaseStorage(uri)
        await storage().ref(fileName).putFile(pathForFirebaseStorage);
        await storage().ref(fileName).getDownloadURL().then(url=>resolve(url));
    }catch(error)
    {

    }
})
}
const getPathForfirebaseStorage=async uri=>{
    if(Platform.OS==="ios")
    {
        return uri;
    }
        const stat=await RNFetchBlob.fs.stat(uri)
        return stat.path
    
}
export default uploadImage