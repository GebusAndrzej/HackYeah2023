import { useCallback } from 'react'
import styles from './ApplicationPage.module.css'
import MapWrapper from './components/MapWrapper/MapWrapper'
import { APP_STATE, appState } from './utils/state'

const ApplicationPage = () => {
  const handleChangeState = useCallback(
    () => {
      appState.value = APP_STATE.ADD
    },
    []
  )

  return (
    <div className={styles.wrapper}>
      <MapWrapper />
    
      {appState.value === APP_STATE.VIEW && (
        <button onClick={handleChangeState} className={styles.addButton}>
            Dodaj elooo
        </button>
      )}
    </div>
  )
}

export default ApplicationPage