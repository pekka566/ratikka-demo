import { render, screen } from "@testing-library/react"
import React from "react"
import { Header } from "./Header"

test("renders Header component", () => {
  render(<Header title="test title" />)
  const linkElement = screen.getByText(/test title/i)
  expect(linkElement).toBeInTheDocument()
})
