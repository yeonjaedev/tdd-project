import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import App from '../App';

const PAGE_NUMBER_TEST_ID = 'page-number';

const renderPageNumbers = () => {
    render(<App pageNumberTestId={PAGE_NUMBER_TEST_ID} />);

    const prevButton = screen.getByText(/prev/i);
    const nextButton = screen.getByText(/next/i);

    return {prevButton, nextButton};
};
describe('App', () => {
    test('App 렌더링 테스트', () => {
        const {prevButton, nextButton} = renderPageNumbers();

        const pageNumbers = screen.getAllByTestId(PAGE_NUMBER_TEST_ID);

        pageNumbers.forEach((pageNumber, i) => {
            expect(pageNumber).toHaveTextContent(`${i + 1}`);
        });

        expect(prevButton).toHaveClass('disabledBtn');
        expect(nextButton).not.toHaveClass('disabledBtn');
    });
    test('첫번째 페이지에서는 이전 페이지로 돌아갈 수 없음', () => {
        const {prevButton} = renderPageNumbers();

        fireEvent.click(prevButton);

        expect(prevButton).toHaveClass('disabledBtn');
    });

    test('중간 페이지에서는 이전, 다음 페이지로 이동할 수 있음', () => {
        const {prevButton, nextButton} = renderPageNumbers();

        fireEvent.click(nextButton);

        expect(nextButton).not.toHaveClass('disabledBtn');
        expect(prevButton).not.toHaveClass('disabledBtn');
    });

    it('마지막 페이지에서는 다음 버튼을 클릭했을 때 다음 페이지로 이동할 수 없음', () => {
        const {prevButton, nextButton} = renderPageNumbers();

        fireEvent.click(screen.getByText(/next/i));
        fireEvent.click(screen.getByText(/next/i));
        fireEvent.click(screen.getByText(/next/i));

        expect(nextButton).toHaveClass('disabledBtn');
        expect(prevButton).not.toHaveClass('disabledBtn');
    });
});
