import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";

export default class ParametroEstacaoController {

    public static async buscarTodos(req: Request, res: Response){
        const parametroEstRepository = AppDataSource.getRepository('station_parameter');

        try{
            const listaEstPar = await parametroEstRepository.find();
            return res.status(200).json(listaEstPar);
        }catch(error){
            console.error("falha ao buscar entidades", error);
            return res.status(500).json({message: "falha ao buscar entidades"})
        }
    }

    public static async buscarUm(req: Request, res: Response){
        const parametroEstRepository = AppDataSource.getRepository('station_parameter');
        const parametroDesejado = {...req.params}

        try{
            //const pegarParametro = await tipoEstacaoRepository.findOne()
        }catch(error){

        }
    }


    public static async criarParametroEst(req: Request, res: Response){
        const parametroEstRepository = AppDataSource.getRepository('station_parameter');
        const parametroDesejado = {...req.body}

        try{
            const objetoEstParametro = parametroEstRepository.create()
        }catch(error){
            console.error("falha ao criar nova entidade", error);
            return res.status(500).json({message: "falha ao criar nova entidade"})
        }
    }

    public static async atualizarParametrosEst(req: Request, res: Response){
        const parametroEstRepository = AppDataSource.getRepository('station_parameter');

        try{

        }catch(error){

        }
    }

    public static async deletarParametrosEst(req: Request, res: Response){
        const parametroEstRepository = AppDataSource.getRepository('station_parameter');

        try{

        }catch(error){

        }
    }
}