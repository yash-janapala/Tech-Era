import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {courses} = props
  const {id, name, logoUrl} = courses

  return (
    <Link to={`courses/${id}`} className="link">
      <li className="course-item">
        <img className="logo" src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
