import { IReport } from '@/types/Report'

type Props = {
    report : IReport
}

const ReportPopup = ({
    report
}: Props) => {


  return (
    <div>
        {report.title} -
    </div>
  )
}

export default ReportPopup