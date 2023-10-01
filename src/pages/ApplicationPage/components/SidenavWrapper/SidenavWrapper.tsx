import styles from './SidenavWrapper.module.css';
import {
    APP_STATE,
    LastTrackedPointProvider,
    appState,
    mapElementState
} from '../../utils/state'
import { GugikService } from '@/services/GugikService';
import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react'
import { IAnimal } from '@/types/Animal';
import { BackendService } from '@/services/BackendService';
import { getBase64 } from '@/helpers/imagehelper';

const SidenavWrapper = () => {
    const [currentAnimal, setCurrentAnimal] = useState<number>(0)
    const service = useMemo(() => new GugikService(), []);
    const backendService = useMemo(() => new BackendService(), []);
    const handleCloseModal = useCallback(
        () => {
            appState.value = APP_STATE.VIEW
            setTimeout(() => {
                mapElementState.value?.invalidateSize()
            }, 500)
        },
        [],
    )
    const [animalsList, setAnimalsList] = useState<IAnimal[] | null>(null)
    const [telephone, setTelephone] = useState('');
    const [animalPicture, setAnimalPicture] = useState<File | null>(null);
    const [name, setName] = useState('');

    const handleSaveForm = useCallback(async () => {
        const picture = await getBase64(animalPicture as File) as string
        const location = LastTrackedPointProvider.getInstance().getLastLocalization()
        backendService.addReport(
            {
                animalId: currentAnimal,
                eventId: null,
                eventPhotos: {
                    image: picture
                },
                localization: {
                    latitude: location.lat,
                    longitude: location.lng
                },
                user: {userId: 'seszn-ajdi', userName: name, phone: telephone}

            })
    }, [animalPicture, backendService, currentAnimal, name, telephone])

    useEffect(() => {
        // LastTrackedPointProvider.getInstance().addListener((location) => {
        //     const [x, y] = projectLatLngToGUGIK(location);

        //     service
        //         .getPlotByXY({ x, y })
        //         .then(setGugikLocation)
        // })
        backendService.getAnimalTypes().then(setAnimalsList)
    }, [backendService, service])

    return (
        <div className={styles.wrapper}>
            <div className={styles.closeModal}
                onClick={handleCloseModal}
            >
        X
            </div>

            <p>Dodaj zwierze</p>
            <select required={true}
                onChange={event => {
                    setCurrentAnimal(+event.currentTarget.value)
                }}
                placeholder="Nazwa zwierza"
            >
                {animalsList?.map((animal) => (
                    <option value={animal.id}
                        key={animal.name}
                    >
                        {animal.name}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Telefon"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
            />

            <input
                type="text"
                placeholder="Imię"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="file"
                onChange={(e) => setAnimalPicture(e.target.files![0])}
                accept="image/png, image/jpeg"
            />

            <img
                src={animalPicture ? URL.createObjectURL(animalPicture) : ''}
                alt="Animal"
            />

            <button onClick={handleSaveForm}>
                Zapisz se kurde
            </button>
        </div>
    );
}

export default SidenavWrapper;
