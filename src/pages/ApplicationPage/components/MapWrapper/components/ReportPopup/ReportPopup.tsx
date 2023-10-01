import { IReport } from '@/types/Report'
import styles from './ReportPopup.module.css';

type Props = {
    report : IReport
}

const ReportPopup = ({
    report
}: Props) => {

    return (
        <div className={styles.wrapper}>
            <img src={report.eventPhotos.image}
                className={styles.image}
            />
        </div>
    )
}

export default ReportPopup