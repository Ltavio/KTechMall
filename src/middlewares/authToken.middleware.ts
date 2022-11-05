import {Request, Response, NextFunction} from "express"
import jwt, { decode } from "jsonwebtoken"
import AppError from "../errors/appErrors";

const authTokenMiddleware = (req:Request, res:Response, next:NextFunction)=>{
	let token = req.headers.authorization
	if(!token){
		throw new AppError("Missing Authorization Token", 401);
	};
	
	token=token.split(" ")[1];

	jwt.verify(token, process.env.SECRET_KEY as string, (error:any, decoded: any)=>{
		if(error){
			throw new AppError("Invalid Token", 401);
		};
		req.user = {
			id:decoded.sub,
			isAdm: decoded.isAdm,
		}
		next();
	})
};

export default authTokenMiddleware;