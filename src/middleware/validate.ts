import type { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";
import { ZodError } from "zod";

export const  validate = (schema:ZodObject) =>
(req:Request, res:Response, next:NextFunction)=>{
    try{
      schema.parse({
            body:req.body,
            params:req.params,
            query:req.query
        });

        next();
    }catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.issues,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };