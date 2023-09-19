import styles from './App.module.css'
import ExamplePage from './pages/ExamplePage/ExamplePage'

function App() {
    return (
        <>
            <div className={styles.moduleChecker}>
              moduleChecker in App page
            </div>
            <ExamplePage />
        </>
    )
}

export default App
