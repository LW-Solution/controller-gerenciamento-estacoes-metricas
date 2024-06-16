import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

export default async function Autenticador(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.sendStatus(401);
    }
    const token = authorization.replace("Bearer", "").trim();

    // Fazendo a requisição para a rota de verificação
    const response = await fetch("http://host.docker.internal:3000/login/verify", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    // Verificando se a resposta indica sucesso na autenticação
    if (!response.ok) {
      return res.sendStatus(401);
    }

    const data = await response.json();
      if (!data) {
        return res.sendStatus(401);
      } else {
        if (data.result == true) {
            return next();

        }
      }
    return res.sendStatus(401);
    
  } catch (error) {
    console.error(error);
    return res.sendStatus(401);
  }
}
