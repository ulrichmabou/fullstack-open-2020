import React from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Total = ({ course }) => {
  let total = course.parts.reduce((sum, part) => sum += part.exercises, 0)
  return (
    <p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>
  )
}

const Course = ({ course }) => {
  return (
    <div> 
      <h2>{course.name}</h2>
      {course.parts.map(part => 
        <li key={part.id} 
            style={{ listStyleType: "none", paddingBottom: 10 }}>
            {part.name} {part.exercises}
        </li>
      )}
      <Total course={course} />
    </div>
  )
}

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} course={course} />
        )}
    </div>
  )
}

const Courses = ({ courses }) =>
(
  <div>
    <Header text={'Web development curriculum'} />
    <Content courses={courses} />
  </div>
)

export default Courses