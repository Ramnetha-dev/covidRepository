// Write your code

import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {item} = props
  return (
    <div className="piechart-circle-container">
      <h1 className="head">Vaccination by age</h1>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={item}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
            <Cell key="18-44" fill=" #2d87bb" />
            <Cell key="45-60" fill="#a3df9f" />
            <Cell key="Above 60" fill="#64c2a6" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
