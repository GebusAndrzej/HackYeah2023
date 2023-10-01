import { IReport } from '@/types/Report'
import styles from './ReportPopup.module.css';
import { useMemo } from 'react';

type Props = {
    report : IReport
}

const ReportPopup = ({
    report
}: Props) => {
    const date = useMemo(
        () => new Date(report.date || ''),
        [report.date]
    )

    return (
        <div className={styles.wrapper}>
            Zgłosił: {report.user.userName} <br/>
            {date.toLocaleDateString()}

            <div className={styles.imageWrapper}>
                <img src={report.eventPhotos.image}
                    className={styles.image}
                />
            </div>

        </div>
    )
}

export default ReportPopup