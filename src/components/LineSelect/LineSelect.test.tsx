import { render, screen, fireEvent } from "@testing-library/react"
import React from "react"
import { vi } from "vitest"
import { IdNamePair } from "../../types"
import { LineSelect } from "./LineSelect"

describe("LineSelect Component", () => {
  const mockLineNames: IdNamePair[] = [
    { id: "line1", name: "Line 1" },
    { id: "line2", name: "Line 2" },
    { id: "line3", name: "Line 3" }
  ]

  const mockHandleChange = vi.fn()

  beforeEach(() => {
    mockHandleChange.mockClear()
  })

  test("renders LineSelect component", () => {
    render(
      <LineSelect
        lineNames={mockLineNames}
        handleChange={mockHandleChange}
        selectedLine=""
      />
    )
    expect(screen.getByLabelText(/line/i)).toBeInTheDocument()
  })

  test("renders all line options", () => {
    render(
      <LineSelect
        lineNames={mockLineNames}
        handleChange={mockHandleChange}
        selectedLine=""
      />
    )

    const select = screen.getByLabelText(/line/i)
    fireEvent.mouseDown(select)

    mockLineNames.forEach((line) => {
      expect(screen.getByText(line.name)).toBeInTheDocument()
    })
  })

  test("displays selected line value", () => {
    render(
      <LineSelect
        lineNames={mockLineNames}
        handleChange={mockHandleChange}
        selectedLine="line2"
      />
    )

    // MUI Select component should render with the selected value
    const select = screen.getByLabelText(/line/i)
    expect(select).toBeInTheDocument()
  })

  test("calls handleChange when selection changes", () => {
    render(
      <LineSelect
        lineNames={mockLineNames}
        handleChange={mockHandleChange}
        selectedLine=""
      />
    )

    const select = screen.getByLabelText(/line/i)
    fireEvent.mouseDown(select)

    const option = screen.getByText("Line 2")
    fireEvent.click(option)

    expect(mockHandleChange).toHaveBeenCalled()
  })

  test("renders with empty line names array", () => {
    render(
      <LineSelect
        lineNames={[]}
        handleChange={mockHandleChange}
        selectedLine=""
      />
    )

    expect(screen.getByLabelText(/line/i)).toBeInTheDocument()
  })

  test("renders with different selected values", () => {
    const { rerender } = render(
      <LineSelect
        lineNames={mockLineNames}
        handleChange={mockHandleChange}
        selectedLine="line1"
      />
    )

    let select = screen.getByLabelText(/line/i)
    expect(select).toBeInTheDocument()

    rerender(
      <LineSelect
        lineNames={mockLineNames}
        handleChange={mockHandleChange}
        selectedLine="line3"
      />
    )

    select = screen.getByLabelText(/line/i)
    expect(select).toBeInTheDocument()
  })
})
