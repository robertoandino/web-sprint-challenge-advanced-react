import React from 'react'
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Write your tests here
/*test('sanity', () => {
  expect(true).toBe(false)
})*/

describe ("Testing AppFunctional headings,buttons render correctly on the screen", () => {

  test('Testing heading and buttons are rendered correctly', () => {
    render(<AppFunctional />);

    expect(screen.getByText(/Coordinates/)).toBeInTheDocument();
    expect(screen.getByText(/You moved/)).toBeInTheDocument();
    expect(screen.getByText(/reset/)).toBeInTheDocument();
    
    // Check if buttons are rendered with correct text
    expect(screen.getByText('LEFT')).toBeInTheDocument();
    expect(screen.getByText('UP')).toBeInTheDocument();
    expect(screen.getByText('RIGHT')).toBeInTheDocument();
    expect(screen.getByText('DOWN')).toBeInTheDocument();
  });

  test('Testing that typing on the input results in its value changing to the entered text', () => {
    render(<AppFunctional />);

    const input = screen.getByPlaceholderText('type email');

    fireEvent.change(input, { target: { value: 'lady@gaga.com' } })

    expect(input.value).toBe('lady@gaga.com')
  })

})