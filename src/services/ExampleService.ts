import { HttpService } from "@/http/axiosDecorator"
import { HttpClient } from "@/http/types"
import { IPost } from "@/types/example"

//class type trick - add decorator prop
export interface ExampleService extends HttpClient { };

@HttpService
export class ExampleService {
    constructor() {
        console.log('Example service created')
    }

    getPost = () => 
        this.http
            .get<IPost>('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.data)
}
