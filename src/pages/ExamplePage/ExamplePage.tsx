import React, { useState } from 'react'
import viteLogo from '/vite.svg'
import svgExample from '@/assets/example.svg'
import styles from './ExamplePage.module.css'
import clsx from 'clsx'

const ExamplePage = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className={styles.moduleChecker}>
                module checker in ExamplePage
            </div>

            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className={styles['logo']} alt="Vite logo" />
                </a>

                <a
                    href="https://react.dev"
                    target="_blank"
                    rel="noreferrer">
                    <img
                        src={svgExample}
                        className={clsx(styles['logo'], styles['react'])}
                        alt="React logo"
                    />
                </a>
            </div>

            <h1>Vite + React</h1>

            <div className={styles['card']}>
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>

                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>

            <p className={styles['read-the-docs']}>
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default ExamplePage