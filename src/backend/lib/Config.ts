import fs from 'fs';
import path from 'path';
import { json } from 'stream/consumers';

const get = async(de:any) =>{
    const Resourcepath  = path.join(__dirname,"../config/config.json")
    try {
        if(!fs.existsSync(Resourcepath)){
            try {
                await fs.promises.writeFile(Resourcepath, "{}", 'utf-8')
            } catch (error) {
                
            }
        }
        const readedfile = await fs.promises.readFile(Resourcepath,"utf-8")
        const jsonRes = JSON.parse(readedfile)
        let ip:any = {}
        // console.log(Object.keys(ip).length)
        let continud = true
        Object.keys(jsonRes).forEach((key)=>{
            function name(value:any,key:any){
                if(continud){
                // console.log(key,value)
                if (key === de ){
                    Object.assign(ip,{config:value})
                    continud = false
                }
                if (typeof value === 'object' && value !== null) {
                    // console.log(`Nested keys in ${key}:`, Object.keys(value));
                } 
                for(let i =0 ; Object.keys(value).length>i;i++){
                    name(value[Object.keys(value)[i]],Object.keys(value)[i])
                }
            }
            }
         name(jsonRes[key],key)
            
        })
        // console.log("ip",ip)
        if (Object.keys(ip).length===0){
            return 0
        }
        else{
            return ip?.config
        }
    } catch (error) {
        console.log(error)
    }
}

const config = {
    get:get
}
export default config;


