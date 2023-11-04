import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PaginationTable from './PaginationTable';

test('Verifying Pagination async initial Page Load ', async () => {
    render(<PaginationTable />);
    await waitFor(() => {
        const tableDataFirstElement = screen.getByTestId('table-data-0');

        expect(tableDataFirstElement).toBeInTheDocument();
    })
});

test('Verifying Pagination working', async () => {
    render(<PaginationTable />);
    await waitFor(() => {
        const secondPageNumber = screen.getByTestId('page-number-1');

        fireEvent.click(secondPageNumber.parentElement)
        waitFor(() => {
            // each page has 10 table data, when second page number is clicked the first element should have table-data-10
            const nextPageFirstElement = screen.getByTestId('table-data-10');
            expect(nextPageFirstElement).toBeInTheDocument();
        })

    })
});