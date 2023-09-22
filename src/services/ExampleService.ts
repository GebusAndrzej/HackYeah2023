import { AHttpClient } from "@/http/axiosAbstract"
import { IPost } from "@/types/example"

// via Abstract Class

export class ExampleService extends AHttpClient {
    constructor() {
        super();
        console.log('Example service created')
    }

    getPost = () => 
        this.http
            .get<IPost>('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.data)
}


// via Decorator

// //override class type trick - add decorator prop
// export interface ExampleService extends IHttpClient { };

// @InjectHttp
// export class ExampleService {
//     constructor() {
//         console.log('Example service created')
//     }

//     getPost = () => 
//         this.http
//             .get<IPost>('https://jsonplaceholder.typicode.com/todos/1')
//             .then(response => response.data)
// }
