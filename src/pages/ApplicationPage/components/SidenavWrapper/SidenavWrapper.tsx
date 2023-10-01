import styles from './SidenavWrapper.module.css';
import {
    APP_STATE,
    BullshitSingleton,
    LastTrackedPointProvider,
    appState,
    mapElementState
} from '../../utils/state'
import { GugikService } from '@/services/GugikService';
import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react'
import { IAnimal } from '@/types/Animal';
import { BackendService } from '@/services/BackendService';
import { getBase64 } from '@/helpers/imagehelper';
import clsx from 'clsx';

const SidenavWrapper = () => {
    const [currentAnimal, setCurrentAnimal] = useState<number>(0);
    const service = useMemo(() => new GugikService(), []);
    const backendService = useMemo(() => new BackendService(), []);
    const handleCloseModal = useCallback(
        () => {
            appState.value = APP_STATE.VIEW
            setTimeout(() => {
                mapElementState.value?.invalidateSize()
                BullshitSingleton.getInstance().notifySomethingChanged()
            }, 500)
        },
        [],
    )
    const [animalsList, setAnimalsList] = useState<IAnimal[] | null>(null)
    const [telephone, setTelephone] = useState('');
    const [animalPicture, setAnimalPicture] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [thereWasAnAttempt, setThereWasAnAttempt] = useState(false)

    const validateForm = useMemo(
        () => ({
            animalId: currentAnimal == 0,
            phone: !telephone.length,
            name: !name.length,
            animalPicture: !animalPicture
        }),
        [animalPicture, currentAnimal, name.length, telephone.length]
    )

    const isAnyError = useMemo(
        () => Object.values(validateForm).some(x => x === true),
        [validateForm]
    )

    const handleSaveForm = useCallback(async () => {
        setThereWasAnAttempt(true);
        if (isAnyError) return;

        const picture = await getBase64(animalPicture as File) as string
        const location = LastTrackedPointProvider.getInstance().getLastLocalization()

        backendService.addReport(
            {
                animalId: currentAnimal,
                eventId: null,
                eventPhotos: {
                    image: picture
                },
                localization: {
                    latitude: location.lat,
                    longitude: location.lng
                },
                user: {userId: null, userName: name, phone: telephone}
            })

        handleCloseModal()
        setThereWasAnAttempt(false);
    }, [animalPicture, backendService, currentAnimal, handleCloseModal, isAnyError, name, telephone])

    useEffect(() => {
        // LastTrackedPointProvider.getInstance().addListener((location) => {
        //     const [x, y] = projectLatLngToGUGIK(location);

        //     service
        //         .getPlotByXY({ x, y })
        //         .then(setGugikLocation)
        // })
        backendService.getAnimalTypes().then(setAnimalsList)
    }, [backendService, service])

    return (
        <div className={styles.wrapper}>
            <div className={styles.innerContainer}>
                <div className={styles.closeModal}
                    onClick={handleCloseModal}
                >
                X
                </div>

                <p>Dodaj zgłoszenie</p>

                <div className={styles.inputContainer}>
                    <span>
                    Zwierzę
                    </span>

                    <select
                        required={true}
                        onChange={event => {
                            setCurrentAnimal(+event.currentTarget.value)
                        }}
                        placeholder="Nazwa zwierza"
                        value={currentAnimal}
                        className={clsx(
                            validateForm.animalId && thereWasAnAttempt && styles.error
                        )}
                    >
                        <option
                            disabled
                            value={0}
                        >
                        Wybierz zwierze
                        </option>

                        {animalsList?.map((animal) => (
                            <option value={animal.animalId}
                                key={animal.animalId}
                            >
                                {animal.name}
                            </option>
                        ))}
                    </select>

                    {validateForm.animalId && thereWasAnAttempt && (
                        <span className={styles.errorLabel}>Pole wymagane</span>
                    )}
                </div>

                <div className={styles.inputContainer}>
                    <span>
                    Numer telefonu
                    </span>

                    <input
                        type="text"
                        placeholder="Telefon"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className={clsx(
                            validateForm.phone && thereWasAnAttempt && styles.error
                        )}
                    />

                    {validateForm.phone && thereWasAnAttempt && (
                        <span className={styles.errorLabel}>Pole wymagane</span>
                    )}
                </div>

                <div className={styles.inputContainer}>
                    <span>
                    Imię

                    </span>

                    <input
                        type="text"
                        placeholder="Imię"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={clsx(
                            validateForm.name && thereWasAnAttempt && styles.error
                        )}
                    />

                    {validateForm.name && thereWasAnAttempt && (
                        <span className={styles.errorLabel}>Pole wymagane</span>
                    )}
                </div>

                <div className={styles.inputContainer}>
                    <span>
                    Zdjęcie
                    </span>

                    <input
                        type="file"
                        onChange={(e) => setAnimalPicture(e.target.files![0])}
                        accept="image/png, image/jpeg"
                        required
                        className={clsx(
                            validateForm.animalPicture && thereWasAnAttempt && styles.error
                        )}
                    />

                    {validateForm.animalPicture && thereWasAnAttempt && (
                        <span className={styles.errorLabel}>Pole wymagane</span>
                    )}
                </div>

                {animalPicture && (
                    <img
                        src={animalPicture ? URL.createObjectURL(animalPicture) : ''}
                        alt="Animal"
                    />
                )}

                <button onClick={handleSaveForm}
                    className={styles.submitButton}
                >
                Zgłoś zwierzę
                </button>
            </div>
        </div>
    );
}

export default SidenavWrapper;
