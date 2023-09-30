import styles from './SidenavWrapper.module.css';
import {
    APP_STATE,
    LastTrackedPointProvider,
    appState
} from '../../utils/state'
import { projectLatLngToGUGIK } from '@/helpers/projectionHelpers';
import { GugikService } from '@/services/GugikService';
import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react'
import { Plot } from '@/types/Plot';

const SidenavWrapper = () => {
    const service = useMemo(() => new GugikService(), []);
    const handleCloseModal = useCallback(
        () => {
            appState.value = APP_STATE.VIEW
        },
        [],
    )
    const [gugikLocation, setGugikLocation] = useState<Plot | undefined>()
    const [telephone, setTelephone] = useState('');
    const [animalPicture, setAnimalPicture] = useState<File | null>(null);
    const [name, setName] = useState('');

    useEffect(() => {
        LastTrackedPointProvider.getInstance().addListener((location) => {
            const [x, y] = projectLatLngToGUGIK(location);

            service
                .getPlotByXY({ x, y })
                .then(setGugikLocation)
        })
    })

    return (
        <div className={styles.wrapper}>
            <div className={styles.closeModal}
                onClick={handleCloseModal}
            >
        X
            </div>

            <p>Dodaj zwierze</p>
            <input type="text"
                placeholder="Nazwa zwierza"
            />

            {/*
  {lastClickedPoint.value?.lat}
  {lastClickedPoint.value?.lng} */}

            {/* <pre>
    {JSON.stringify(gugikLocation, null, 4)}
  </pre> */}
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
            />

            <img
                src={animalPicture ? URL.createObjectURL(animalPicture) : ''}
                alt="Animal"
            />
            <button>
        Dodaj Zgłoszenie
            </button>
        </div>
    );
}

export default SidenavWrapper;
