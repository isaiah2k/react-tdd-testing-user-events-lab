import { useState } from "react"

function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [interests, setInterests] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const interestOptions = ["Coding", "Design", "Music"]

  function handleCheckboxChange(event) {
    const { value, checked } = event.target
    if (checked) {
      setInterests([...interests, value])
    } else {
      setInterests(interests.filter((interest) => interest !== value))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main>
      <h1>Hi, I'm Isaiah</h1>
      <img alt="My profile pic" src="https://media.licdn.com/dms/image/v2/D4D03AQH7fIYxbfI4AQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723759926492?e=1752105600&v=beta&t=wTJ653hBuc4FyVaa2vA4w0rT7n9njyDZ_KldtZtWrPA" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div>
        <a href="https://github.com/isaiah2k">GitHub</a>
        <a href="https://www.linkedin.com/in/isaiah-mitchel707/">LinkedIn</a>
      </div>
      <hr />
      <h2>Sign Up for My Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <fieldset>
          <legend>Select your interests:</legend>
          {interestOptions.map((interest) => (
            <label key={interest}>
              <input
                type="checkbox"
                value={interest}
                checked={interests.includes(interest)}
                onChange={handleCheckboxChange}
              />
              {interest}
            </label>
          ))}
        </fieldset>
      <button type="submit">Submit</button>
      </form>
        {submitted && (
        <div>
          <h3>Thank you for signing up, {name}!</h3>
          <p>We've sent a confirmation to: {email}</p>
            {interests.length > 0 && (
          <p>Your interests: {interests.join(", ")}</p>
          )}
        </div>
      )}
    </main>
  )
}

export default App
