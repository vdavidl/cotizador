import jwt from "jsonwebtoken";
import {envs} from "./envs"

interface GenerateTokenProps{
    payload: any;
    duration?: string;
    seed: string;
}

export class JwtAdapter{
    static async generateToken({payload, duration = '24h', seed,} : GenerateTokenProps ){
        return await new Promise((resolve)=>{
            jwt.sign(payload, seed, {expiresIn: duration}, (error, token) =>{
                if(error){
                    resolve(null);
                    return;
                }
                resolve(token);
            })
        });


    }

    static async validatedToken<T>(token: string): Promise<T | null> {
        return await new Promise((resolve) => {
          jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
            if (err) {
              resolve(null);
              return;
            }
            resolve(decoded as T);
          });
        });
      }
}