import { useCallback } from 'react'
import styles from './ApplicationPage.module.css'
import MapWrapper from './components/MapWrapper/MapWrapper'
import { APP_STATE, appState } from './utils/state'
import SidebarComponent from './components/MapWrapper/components/SidebarComponent/SidebarComponent'

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
  
     <SidebarComponent />

      
    </div>
  )
}

export default ApplicationPage