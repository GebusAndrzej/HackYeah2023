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
    const [gugikLocation, setGugikLocation] = useState<Plot | undefined>()

    const handleCloseModal = useCallback(
        () => {
            appState.value = APP_STATE.VIEW
        },
        [],
    )

    useEffect(() => {
        LastTrackedPointProvider.getInstance().addListener((location) => {
            const [x, y] = projectLatLngToGUGIK(location);

            service
                .getPlotByXY({ x, y })
                .then(setGugikLocation)
        })
    }, [service])

    return (
        <div className={styles.wrapper}>
            <div onClick={handleCloseModal}>
        X
            </div>

            <p>Dodaj zwierze</p>
            <input type="text"
                placeholder="Nazwa zwierza"
            />
            <button>
        Dodaj
            </button>

            <pre>
                {JSON.stringify(gugikLocation, null, 4)}
            </pre>
        </div>
    );
}

export default SidenavWrapper;
