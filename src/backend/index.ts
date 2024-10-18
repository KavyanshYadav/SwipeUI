import express, { Request, Response } from 'express';
import {ApiResponse} from  "./util/Apirespose"
import {api,internal} from "./routes/index"
import {GetResourceJson} from "./lib/GetResourceJson"
import {ConnectToMongoDb} from "./services/mongo"
import config from "./lib/Config"
import {addCache} from "./lib/Caching"

export const CONFIG ={

}

const app = express();
const port = 3000;



const q = [ConnectToMongoDb]
app.use(express.json())

q.forEach((e)=>{
  e()
})

app.use("/api",api)

app.use("/intenal",internal)
GetResourceJson();
addCache({ key: "name", data: "dad", expiredTime: new Date() });

(async () => {
  try {
    // const s =await config.get("andda")
    // console.log(s)
  } catch (error) {
      console.error('config not found:', error);
  }
})();


app.get('/', (req: Request, res: Response) => {
  const response = ApiResponse.success({ name: "John Doe" }, "User fetched successfully");
  res.status(response.status).json(response);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
