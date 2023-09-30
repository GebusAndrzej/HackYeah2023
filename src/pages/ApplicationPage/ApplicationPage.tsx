import { useCallback, useEffect } from 'react'
import styles from './ApplicationPage.module.css'
import MapWrapper from './components/MapWrapper/MapWrapper'
import {
    APP_STATE,
    appState,
    mapElementState
} from './utils/state'
import SidenavWrapper from './components/SidenavWrapper/SidenavWrapper'

const ApplicationPage = () => {
    const handleChangeState = useCallback(
        () => {
            appState.value = APP_STATE.ADD
            setTimeout(() => {
                mapElementState.value?.invalidateSize()
            }, 500)
        },
        []
    )

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

        </div>
    )
}

export default ApplicationPage