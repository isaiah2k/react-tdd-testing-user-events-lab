import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'

import App from "../App"

test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  })

  expect(topLevelHeading).toBeInTheDocument()
})

test("displays an image of yourself", () => {
  render(<App />)

  const image = screen.getByAltText("My profile pic")

  expect(image).toHaveAttribute("src", expect.stringContaining("media.licdn.com"))
})

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  })

  expect(secondLevelHeading).toBeInTheDocument()
});

test("displays a paragraph for your biography", () => {
  render(<App />)

  const bio = screen.getByText(/lorem ipsum/i)

  expect(bio).toBeInTheDocument()
})

test("displays the correct links", () => {
  render(<App />)

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  })
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  })

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  )

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("linkedin.com")
  )
})

test("the form includes text inputs for name and email address", () => {
  render(<App />)
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
})

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />)
  expect(screen.getByLabelText(/coding/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/music/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/design/i)).toBeInTheDocument()
})

test("the checkboxes are initially unchecked", () => {
  render(<App />)
  expect(screen.getByLabelText(/coding/i)).not.toBeChecked()
  expect(screen.getByLabelText(/music/i)).not.toBeChecked()
  expect(screen.getByLabelText(/design/i)).not.toBeChecked()
})

test("the page shows information the user types into the name and email address form fields", async () => {
  render(<App />)
  await userEvent.type(screen.getByLabelText(/name/i), "Name")
  await userEvent.type(screen.getByLabelText(/email/i), "email@example.com")

  expect(screen.getByLabelText(/name/i)).toHaveValue("Name")
  expect(screen.getByLabelText(/email/i)).toHaveValue("email@example.com")
})

test("checked status of checkboxes changes when user clicks them", async () => {
  render(<App />)
  const coding = screen.getByLabelText(/coding/i)
  const music = screen.getByLabelText(/music/i)

  await userEvent.click(coding)
  expect(coding).toBeChecked()

  await userEvent.click(music)
  expect(music).toBeChecked()
})

test("a message is displayed when the user clicks the Submit button", async () => {
  render(<App />)

  await userEvent.type(screen.getByLabelText(/name/i), "Name")
  await userEvent.type(screen.getByLabelText(/email/i), "email@example.com")
  await userEvent.click(screen.getByLabelText(/coding/i))
  await userEvent.click(screen.getByRole("button", { name: /submit/i }))

  expect(screen.getByText(/thank you/i)).toBeInTheDocument()
  expect(screen.getByText(/email@example.com/i)).toBeInTheDocument()
})