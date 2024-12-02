// Write your code here

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {vaccinationDataObject: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getDataObject()
  }

  getFormattedData = data => ({
    dose1: data.dose_1,
    dose2: data.dose_2,
    vaccinationDate: data.vaccine_date,
  })

  getDataObject = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')

    if (response.ok === true) {
      const fetcheData = await response.json()

      const updatedData = {
        lastDaysVaccination: fetcheData.last_7_days_vaccination.map(eachOne =>
          this.getFormattedData(eachOne),
        ),
        vaccinationByAge: fetcheData.vaccination_by_age,
        vaccinationByGender: fetcheData.vaccination_by_gender,
      }
      this.setState({
        vaccinationDataObject: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }

    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {vaccinationDataObject} = this.state
    console.log(vaccinationDataObject)

    return (
      <div className="website-container">
        <div className="bg-container">
          <div className="app-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="app-logo"
            />
            <p className="text">Co-WIN</p>
          </div>
          <h1 className="heading">CoWIN Vaccination in india</h1>

          <VaccinationCoverage
            value={vaccinationDataObject.lastDaysVaccination}
          />
          <VaccinationByGender
            each={vaccinationDataObject.vaccinationByGender}
          />

          <VaccinationByAge item={vaccinationDataObject.vaccinationByAge} />
        </div>
      </div>
    )
  }

  renderInProgressView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="error">Something Went Wrong</h1>
    </div>
  )


  renderResultView = () => {
     const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.inProgress:
        return this.renderInProgressView()

      default:
        return null
    }
  }
  

  render() {
    return (
      this.renderResultView()
    )
  }
}

export default CowinDashboard
