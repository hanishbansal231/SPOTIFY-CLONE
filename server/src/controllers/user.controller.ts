import User from "@models/user.model";


export const getAllUser = async () => {
    try{
        const users = await User.find({});
        return users;
    }catch(error){
        console.log(error);
    }
}