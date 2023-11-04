import { render, screen, fireEvent, within } from '@testing-library/react';
import arrData from './usb_data.json';
import FixedSizePacketTable from './FixedSizePacketTable';

test('Verifying initial Fixed Size Packet Table Page Load', async () => {
    render(<FixedSizePacketTable data={arrData.table} />);
    const initialLoadElement = screen.getByText(/Total No of Rows:/i);
    expect(initialLoadElement).toBeInTheDocument();
});

test('Verifying Scroll to last row button click', async () => {
    render(<FixedSizePacketTable data={arrData.table} />);
    const EndIndexElement = screen.getByTestId('ending-index')
    const ScrollToLastRowElement = screen.getByTestId('scroll-to-last-row')
    fireEvent.click(ScrollToLastRowElement)
    expect(EndIndexElement).toHaveTextContent(`Visibile Row Ending Index: ${arrData.table.length - 1}`)
});

test('Verifying Scroll to Top row button click', async () => {
    render(<FixedSizePacketTable data={arrData.table} />);
    const StartIndexElement = screen.getByTestId('starting-index')
    const ScrollToTopRowElement = screen.getByTestId('scroll-to-top-row')
    fireEvent.click(ScrollToTopRowElement)
    expect(StartIndexElement).toHaveTextContent(`Visibile Row Starting Index: 0`)
});

test('Verifying Filter option to endter row number', async () => {
    render(<FixedSizePacketTable data={arrData.table} />);
    const InputElement = screen.getByPlaceholderText('Enter Row Number')
    const SubmitElement = screen.getByTestId('submit-btn')
    const ScrollValueElement = screen.getByTestId('vertical-scroll-value')
    fireEvent.change(InputElement, {target: {value: "21"}})
    fireEvent.click(SubmitElement)
    expect(ScrollValueElement).toHaveTextContent(`Vertical Scroll Value: 503`)
});