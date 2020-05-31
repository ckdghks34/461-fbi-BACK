import { getBooklist, getAllUser, getCategory,getLibrary,getLibraryBooks,getUserBook,getlog } from "./DB";
import {loginUser,joinUser,addLog,mostSearchbook,searchedBook,mindbook} from "./DB";

const resolvers = {
        Query: {
                        getBooklist: () => getBooklist(),
                        getAllUser: () => getAllUser(),
                        getUserBook: () => getUserBook(),
                        getCategory: () => getCategory(),
                        getLibrary: () => getLibrary(),
                        getLibraryBooks: () => getLibraryBooks(),
                        getlog:() => getlog(),
                        loginUser:(_,{id,pw}) => loginUser(id,pw),
                        mostSearchbook:() => mostSearchbook(),
                        mindbook:(_,{id}) => mindbook(id),
                        searchedBook:(_,{id}) => searchedBook(id)
                },
        Mutation:{
                        joinUser:(_,{user_ID,user_password,user_name,user_phone,user_age,user_gender}) => joinUser(user_ID,user_password,user_name,user_phone,user_age,user_gender),
                        addLog:(_,{book_num,user_ID,user_age,book_category}) => addLog(book_num,user_ID,user_age,book_category)
        }
};

export default resolvers;