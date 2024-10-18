
import config from "./Config"

interface cacheInput{
    key:string,
    data:any,
    expiredTime:Date
}

interface cacheD {
    [fieldName:string]:cacheInput
}

// let cache:cacheD ={
//     name:{
//         data:"sample",
//         expiredTime: new Date()
//     }

// }

let limit:any = 0;

(async ()=>{
    limit = await config.get("ttl")
})()

let CacheDb = new Map()
CacheDb.set("ds",{
    dsd:"dsd"
})
export const addCache = async(cache: cacheInput) => {
    try {
        const limit:any = await config.get("ttl")
        console.log("Current cache size:", CacheDb.size,limit); // Log the current size
        if (CacheDb.size >= limit) {
            console.log("Cache limit reached. Consider evicting items.");
            cleanup()
        }
        CacheDb.set(cache.key,{data:cache.data,expiredtime:cache.expiredTime})
    } catch (error) {
        
    }  
};
const deleteCache = () =>{

}

const cleanup = () =>{

}

