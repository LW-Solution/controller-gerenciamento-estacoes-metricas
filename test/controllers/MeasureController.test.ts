import app from "../../src/server"
import request, {Response} from "supertest"


describe("Teste de integracao da rota de criacao de medidas" ,() => {

    
    it("Teste de objeto incompleto, sem os relacionamentos", async () => {
        const response: Response = await request(app).post("/measure/teste")
        .send({
            id_measure: 1,
            value: 100,
            unixtime: 12345789,
            station_parameter: {},
            occurrences: [],
            
        })
        expect(response.status).toBe(500)
    })
})