import createApiClient from "../api.service";

class GameServiceClient {
    constructor(baseUrl = "http://localhost:3001/"){
        this.api = createApiClient(baseUrl);
    }

    async postData(data){
        return (await this.api.post('/board', data));
    }

    async putData( id, data){
        return (await this.api.put(`/board/${id}`, data));
    }

    async getData(){
        return (await this.api.get('/board')).data;
    }

    async getIdBoard(idBoard){
        return (await this.api.get(`/board/${idBoard}`)).data;
    }

    async getItemDetail(id) {
        return (await this.api.get(`/board/detail/${id}`)).data;
    }

    
}

const gameService = new GameServiceClient();
export default gameService;