import { useCallback } from 'react'
import styles from './ApplicationPage.module.css'
import MapWrapper from './components/MapWrapper/MapWrapper'
import {
    APP_STATE,
    LastTrackedPointProvider,
    appState,
    mapElementState
} from './utils/state'
import SidenavWrapper from './components/SidenavWrapper/SidenavWrapper'

const ApplicationPage = () => {
    const handleChangeState = useCallback(
        () => {
            appState.value = APP_STATE.ADD
            setTimeout(() => {
                const map = mapElementState.value;
                if (map) {
                    map.invalidateSize()
                    LastTrackedPointProvider.getInstance().setLastClickedPoint(map.getCenter())
                }
            }, 500)
        },
        []
    )

    const handleLocate = () => {
        const map = mapElementState.value;
        if (map) {
            map.locate()
        }
    }

    return (
        <div className={styles.wrapper}>
            <MapWrapper />

            {appState.value === APP_STATE.ADD && (
                <SidenavWrapper />
            )}

            {appState.value === APP_STATE.VIEW && (
                <button onClick={handleChangeState}
                    className={styles.addButton}
                >
          Dodaj dzikie zwierzę
                </button>
            )}

            <button onClick={handleLocate}
                className={styles.locateButton}
            >
          ╟╢╙╜⌡
            </button>
        </div>
    )
}

export default ApplicationPage