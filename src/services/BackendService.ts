import { AHttpClient } from '@/http/axiosAbstract';
import { IAnimal } from '@/types/Animal';
import { IPredictedReport } from '@/types/PredictedReport';
import { IReport } from '@/types/Report';

export class BackendService extends AHttpClient {
    constructor() {
        super();
    }

    addReport = (report: IReport) => this.http.post('/api/Event/Create', report)

    getAnimalTypes = () => this.http
        .get<IAnimal[]>('/api/Animal/GetAll')
        .then(response => response.data)

    getAllReports = () => this.http
        .get<IReport[]>('/api/Event/GetAll')
        .then(response => response.data)

    getPredictedPins = () => this.http
        .get<IPredictedReport[]>('/api/PredictedEvent/GetAll')
        .then(response => response.data)
}