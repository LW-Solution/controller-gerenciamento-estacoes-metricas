import { Request, Response, Router } from "express";
import saveData from "../repositories/RecepcaoRepository";

const recepcaoRouter = Router();

recepcaoRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Extrair dados do corpo da requisição
    const jsonString = JSON.stringify(req.body); // Converta o objeto req.body para uma string JSON

    const jsonArray = req.body;


    // Processar cada objeto JSON
    // Validar a estrutura do objeto (opcional, dependendo dos requisitos)
    if (
      !jsonArray.uuid ||
      !jsonArray.unix ||
      !jsonArray.parametros
    ) {
      return res
        .status(400)
        .json({
          message: "Objeto JSON inválido. Verifique os campos obrigatórios.",
        });
    }

    // Salvar os dados no repositório
    await saveData(jsonArray);

    // Responder com sucesso
    return res.status(200).json({ message: "Dados salvos com sucesso" });
  } catch (error) {
    // Se ocorrer um erro, responder com erro interno do servidor
    return res
      .status(500)
      .json({
        message: "Não foi possível salvar os dados",
        error: error.message,
      });
  }
});

export default recepcaoRouter;
