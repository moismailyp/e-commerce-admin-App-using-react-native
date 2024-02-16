import { UPDATECATOGARIES, LOGIN,SIGNOUT,UPDATEPROFILE,UPDATECARTCOUNT,UPDATEWISHIDS } from "./constants"
export const login=data=>({
    type:LOGIN,
    payload:{
        userId:data.userId,
        email:data.email,
        username:data.username,
        mobileNumber:data.mobileNumber,
        profileImage:data.profileImage
    }
})
export const signout=()=>({
    type:SIGNOUT,
    payload:{

    }
})

export const updateProfile=(data)=>({
    type:UPDATEPROFILE,
    payload:{
        email:data.email,
        username:data.username,
        mobileNumber:data.mobileNumber,
        profileImage:data.profileImage

}
})
  