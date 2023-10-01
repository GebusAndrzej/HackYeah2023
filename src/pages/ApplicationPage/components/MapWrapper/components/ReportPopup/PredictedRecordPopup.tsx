import { IPredictedReport } from '@/types/PredictedReport'
import styles from './ReportPopup.module.css';

type Props = {
    report : IPredictedReport
}

const PredictedReportPopup = ({
    report
}: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
                <img src={report.photo.image}
                    className={styles.image}
                />
            </div>

        </div>
    )
}

export default PredictedReportPopup;
