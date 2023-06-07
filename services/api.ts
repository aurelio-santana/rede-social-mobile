import axios from "axios";

export default axios.create({
/*     baseURL: "http://localhost:8082/api/v1", */
/*     baseURL: "http://192.168.80.1:8082/api/v1", */
/*     baseURL: "http://localhost:4000/v1", */
    baseURL: "http://192.168.0.11:8082/api/v1",
    
});