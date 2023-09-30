import { useCallback } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import styles from './SidenavWrapper.module.css';

type Props = {};

const SidenavWrapper = (props: Props) => {
  // // const map = useMapEvents({
  // //   click(e) {
  // //     // Add marker to clicked location
  // //   },
  // // });
  
  // const handleAddMarker = useCallback(() => {
  //   // Set map click handler 
  // }, []);

  return (
    <div className={styles.wrapper}>

      <p>Dodaj zwierze</p>
      <input type="text" placeholder="Nazwa zwierza" />
      <button>
        Dodaj
      </button> 


    </div>
  );
}

export default SidenavWrapper;
