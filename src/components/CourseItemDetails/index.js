import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {courseItemDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiResponse = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (apiResponse.ok) {
      const apiResponseData = await apiResponse.json()
      const updateCourseItemDetails = {
        id: apiResponseData.course_details.id,
        name: apiResponseData.course_details.name,
        imageUrl: apiResponseData.course_details.image_url,
        description: apiResponseData.course_details.description,
      }
      this.setState({
        courseItemDetails: updateCourseItemDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {courseItemDetails} = this.state
    const {name, imageUrl, description} = courseItemDetails

    return (
      <div className="course-item-view-container">
        <img src={imageUrl} alt={name} className="course-item-image" />
        <div className="course-details-container">
          <h1 className="course-item-heading">{name}</h1>
          <p className="course-item-description">{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        onClick={this.getCourseItemDetails}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="failure-view-container">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderViewResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderViewResults()}
      </div>
    )
  }
}

export default CourseItemDetails
