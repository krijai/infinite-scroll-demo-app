import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from './Accordion';


const questionsMockData = [{
    "question": "Test Question 1",
    "answer": "Test Answer 1"
},
{
    "question": "Test Question 2",
    "answer": "Test Answer 2"
}]

test('Verifying initial Accordion Page Load', async () => {
    render(<Accordion questions={questionsMockData} />);
    const initialLoadElement = screen.getByText(/Test Question 1/i);
    expect(initialLoadElement).toBeInTheDocument();
});

test('Verifying Accordion Item expand', async () => {
    render(<Accordion questions={questionsMockData} />);
    const accordionTitleElement = screen.getByTestId('accordion-title-0')
    const accordionContentElement = screen.getByTestId('accordion-content-0')
    fireEvent.click(accordionTitleElement)
    expect(accordionContentElement).toHaveClass('active')
});