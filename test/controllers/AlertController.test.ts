import app from "../../src/server"
import request, {Response} from "supertest"


describe("Teste de integracao da rota de criacao de alertas" ,() => {

    
    it("Teste de objeto incompleto, sem os relacionamentos", async () => {
        const response: Response = await request(app).post("/alert/")
        .send({
            id_alert: 1,
            condition: "condicao",
            description: "descricao",
            value: 1000,
            station: {},
            parameter_type: {},
            occurrences: []
        })
        expect(response.status).toBe(500)
    })
})