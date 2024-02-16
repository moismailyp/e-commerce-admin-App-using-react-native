import { act } from "react-test-renderer";
import { LOGIN,SIGNOUT, UPDATEPROFILE ,UPDATECATOGARIES,UPDATECARTCOUNT,UPDATEWISHIDS} from "./constants";
const initialState={
    isLoggedIn:false,

    userId:'',
    username:'',
    mobileNumber:'',
    email:'',
    profileImage:''  
};
export const InKartReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                isLoggedIn:true,
                userId:action.payload.userId,
                username:action.payload.username,
                mobileNumber:action.payload.mobileNumber,
                email:action.payload.email,
                profileImage:action.payload.profileImage,
            }
            case SIGNOUT:
                return{
                    ...state,
                    isLoggedIn:false,
                    userId:'',
                }
                case UPDATEPROFILE:

                    return{
                        ...state,
                        username:action.payload.username,
                        email:action.payload.email,
                        mobileNumber:action.payload.mobileNumber,
                        profileImage:action.payload.profileImage,
                    }
                    case UPDATECATOGARIES:
                    return{
                        ...state,
                        categories:action.payload.categories,
                    }
                    case UPDATECARTCOUNT:
                        return{
                            ...state,
                            cartCount:action.payload.cartCount,
                        }
                        case UPDATEWISHIDS:
                            return{
                                ...state,
                                wishIds:action.payload.wishIds
                            }
            default:
                return state;
    }
};
