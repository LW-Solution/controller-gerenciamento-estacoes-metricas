import app from "../../src/server"
import request, {Response} from "supertest"


describe("Teste de integracao da rota de criacao de localizacao" ,() => {

    
    it("Teste de objeto incompleto, sem os relacionamentos", async () => {
        const response: Response = await request(app).post("/locations/")
        .send({
            id_location: 1,
            location_name: "nome localizacao",
            latitude: "12345789",
            longitude: "12345656",
            stations: [],
            
        })
        expect(response.status).toBe(404)
    })
})