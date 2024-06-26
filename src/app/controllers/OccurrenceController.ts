import { Request, Response, Router } from "express";
import OccurrenceRepository from '../repositories/OccurrenceRepository';
import IOccurrence from "../interfaces/IOccurrence";

const occurrenceRouter = Router();

// Rota para buscar todas as ocorrências
occurrenceRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
  try {
    const occurrences = await OccurrenceRepository.getOccurrences();
    return res.status(200).json(occurrences);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Rota para buscar uma ocorrência por ID
occurrenceRouter.get('/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  
  try {
    const occurrence = await OccurrenceRepository.getOccurrenceById(parseInt(id, 10));
    
    if (!occurrence) {
      return res.status(404).json({ message: 'Occurrence not found' });
    }

    return res.status(200).json(occurrence);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Rota para criar uma nova ocorrência
occurrenceRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    const newOccurrence = await OccurrenceRepository.createOccurrence(req.body);
    return res.status(201).json(newOccurrence);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create occurrence', error: error.message });
  }
});

// Rota para atualizar uma ocorrência existente
occurrenceRouter.put('/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const updatedOccurrence: IOccurrence = req.body;

  try {
    const updated = await OccurrenceRepository.updateOccurrence(parseInt(id, 10), updatedOccurrence);
    
    if (!updated) {
      return res.status(404).json({ message: 'Ocorrência não encontrada para atualização' });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar ocorrência', error: error.message });
  }
});

// Rota para deletar uma ocorrência
occurrenceRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    await OccurrenceRepository.deleteOccurrence(parseInt(id, 10));
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao excluir ocorrência', error: error.message });
  }
});


export default occurrenceRouter;
