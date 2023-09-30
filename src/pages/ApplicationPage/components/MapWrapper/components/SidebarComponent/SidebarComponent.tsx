import React, { useState } from 'react';
import styles from './SidebarComponent.module.css';
import { APP_STATE, appState } from '@/pages/ApplicationPage/utils/state';

type Props = {};

const SidebarComponent = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {appState.value === APP_STATE.VIEW && (
                <div className={`${styles.sidebar} ${isOpen ? 'open' : ''}`}>
                    <button onClick={toggleSidebar}>Toggle</button>
                    {<h1>galaktyka dupa planeta kutas</h1>}
                </div>
            )}
        </>
    );
};

export default SidebarComponent;
