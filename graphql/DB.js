// ./graphql/DB.js
import mariadb from "mariadb";
import {dbConfig} from "../config/db_config";
import {PrismaClient} from "@prisma/client";

// MariaDB connect pool
// http://github.com/sidorares/node-mysql2
const pool = mariadb.createPool({
        host : dbConfig.host,
        user : dbConfig.user,
        port : dbConfig.port,
        password : dbConfig.password,
        database : dbConfig.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
});

const prisma = new PrismaClient();

//회원가입
export const joinUser = async(user_ID,user_password,user_name,user_phone,user_age,user_gender) =>{
    const newuser = await prisma.uSER.create({
        data:{
            user_ID: user_ID,
            user_password:user_password,
            user_name:user_name,
            user_phone:user_phone,
            user_age:user_age,
            user_gender:user_gender
        }
    });

    return newuser;
}

//로그인
export const loginUser = async(id,pw) =>{
    const loginuser = await prisma.uSER.findMany(
        {
            where: {user_ID: String(id), user_password:String(pw)}
        }
    );
    return loginuser;
}

//비밀번호찾기


//ID기준 회원정보 찾기


//회원 비밀번호 변경

//






//회원 마음속의 저장!
export const getMindbook = async(user_id) =>{
    const selected_user = await prisma.uSER.findOne(
        {
            where: {user_ID: String(user_id)}
        }
    )
    const mindbook = await prisma.bOOK.findOne(
        {
            where: {book_num: selected_user.user_mindbook}
        }
    );
    return mindbook;
};

//회원 마음속의 저장 업데이트
export const updateMindbook = async(user_id,book_id) =>{
    const newmindbook = await prisma.uSER.update({
        where:{user_ID:String(user_id)},
        data:{ user_mindbook : book_id}
    })
}

//책 번호로 책정보 찾기
export const getByBookNum = async(book_id) => {
    const getbook = await prisma.bOOK.findOne({
        where : {user_ID : String(book_id)}
    })

    return getbook;
}

// Best5 도서 목록
export const mostSearchbook = async() =>{
    const logcount = await pool.query("select book_num, count(book_num) from fbi.LOG group by book_num order by count(book_num) DESC Limit 0,5");
    console.log(logcount);
    return logcount;
}

// 회원별 검색했던 도서 목록
export const searchedBook = async(user_id) =>{

    BOOK [books];
    
    const searchedUser = await prisma.lOG.findMany({
        where: {user_ID : String(user_id)}
    });
    
    for(var i in searchedUser) 
    {
        books.push(await prisma.bOOK.findMany({
            where: {
                book_num : searchedUser[i].book_num
            }
        }));
    }
    console.log({books});
    
    return books;
}

// 로그 기록
export const addLog = async(book_num,user_ID,user_age,book_category) => {
    const newlog = await prisma.lOG.create({
            data:{
                USER: {connect: {user_ID:user_ID}},
                user_age:user_age,
                BOOK_BOOKToLOG_book_category: {connect :{book_category:book_category}},
                BOOK_BOOKToLOG_book_num: { connect :{book_num:book_num}}
        }
        
    });

    console.log(newlog);
    return newlog;
}

//책 목록 모두 가져오기
export const getBooklist = async() =>{
    const booklist = await prisma.bOOK.findMany();
    return booklist;
};
//회원 목록 모두 가져오기
export const getAllUser = async() =>{
    const alluserlist = await prisma.uSER.findMany();
    return alluserlist;
};
//회원의 책정보 가져오기
export const getUserBook = async() =>{
    const userbook = await prisma.user_BOOK.findMany();
    return userbook;
};
//모든 책 카테고리정보 가져오기
export const getCategory = async() =>{
    const bookcategory = await prisma.cATEGORY.findMany();
    return bookcategory;
};
// 모든 서점정보 가져오기
export const getLibrary = async() =>{
    const librarylist = await prisma.lIBRARY.findMany();
    return librarylist;
};
// 모든 서점의 보유목록 가져오기
export const getLibraryBooks = async() =>{
    const librarybooks = await prisma.lIB_OWN_BOOK.findMany();
    return librarybooks;
};
// 모든 로그정보 가져오기
export const getlog = async() =>{
    const logdata = await prisma.lOG.findMany();
    return logdata;
};
