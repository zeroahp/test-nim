import createApiClient from "../api.service";

class GameServiceClient {
    constructor(baseUrl = "http://localhost:3001/api"){
        this.api = createApiClient(baseUrl);
    }

    async postData(data){
        return (await this.api.post('/board', data));
    }

    async getData(){
        return (await this.api.get('/board')).data;
    }

    
    // async getAllRanking(option = {}) {
    //     return (await this.api.get("/ranking", option)).data;
    // }

    
}

const gameService = new GameServiceClient();
export default gameService;