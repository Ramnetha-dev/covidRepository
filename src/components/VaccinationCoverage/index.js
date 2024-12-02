// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {value} = props

  const DataFormater = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="barchat-container">
      <h1 className="head">Vaccination Coverage</h1>
      <BarChart width={1000} height={300} data={value} margin={{top: 20}}>
        <XAxis
          dataKey="vaccinationDate"
          tick={{stroke: '#94a3b8', stokeWidth: 1}}
        />
        <YAxis
          tickFormatter={DataFormater}
          tick={{stroke: '94a3b8', strokeWidth: 0}}
        />
        <Legend WrapperStyle={{padding: 60}} />
        <Bar dataKey="dose1" name="Dose 1" fill="#2d87bb" className="bar" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
