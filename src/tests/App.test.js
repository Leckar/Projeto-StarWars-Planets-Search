import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import App from '../App';

describe('Tests the Star Wars project', () => {
  const T_HEADER_NUMBER = 13;
  const T_ROW_NUMBER = 11;
  const UNFILTERED_NUMBER = 10;
  const FILTERED_BY_NAME = 4;
  const FILTERED_BY_NAME_AND_POP = 3;
  const PLANET_NAME = 'planet-name';
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(testData),
    });
  });
  it('should render all elements correctly', async () => {
    render(<App />);
    // Header
    const header = screen.getByText(/Project: Star Wars Planets - Trybe/i);
    expect(header).toBeInTheDocument();
    // Filter elements
    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();
    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    const buttonRemoveFilter = screen.getByTestId('button-remove-filters');
    expect(buttonRemoveFilter).toBeInTheDocument();
    // Sort elements
    const columnSort = screen.getByTestId('column-sort');
    expect(columnSort).toBeInTheDocument();
    const inputAscSort = screen.getByTestId('column-sort-input-asc');
    expect(inputAscSort).toBeInTheDocument();
    const inputDescSort = screen.getByTestId('column-sort-input-desc');
    expect(inputDescSort).toBeInTheDocument();
    const buttonSort = screen.getByTestId('column-sort-button');
    expect(buttonSort).toBeInTheDocument();
    // Table elements
    const tableHeaderList = screen.getAllByRole('columnheader');
    expect(tableHeaderList.length).toBe(T_HEADER_NUMBER);
    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBe(T_ROW_NUMBER);
    });
  });
  it('should filter correctly and list filters correctly', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId(PLANET_NAME).length).toBe(UNFILTERED_NUMBER);
    });
    const nameFilter = screen.getByTestId('name-filter');
    userEvent.type(nameFilter, 'in');
    expect(screen.getAllByTestId(PLANET_NAME).length).toBe(FILTERED_BY_NAME);
    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, 'population');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    const valueFilter = screen.getByTestId('value-filter');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '0');
    expect(valueFilter).toHaveValue(0);
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    userEvent.click(buttonFilter);
    await waitFor(() => {
      expect(screen.getAllByTestId(PLANET_NAME).length).toBe(FILTERED_BY_NAME);
    });
    expect(screen.getByText('population maior que 0')).toBeInTheDocument();
    const buttonRemoveFilter = screen.getByTestId('button-remove-filters');
    userEvent.click(buttonRemoveFilter);
    await waitFor(() => {
      expect(screen.getAllByTestId(PLANET_NAME).length).toBe(FILTERED_BY_NAME);
    });
  });
  it('should sort the elements correctly', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId(PLANET_NAME).length).toBe(UNFILTERED_NUMBER);
    });
    const columnSort = screen.getByTestId('column-sort');
    userEvent.selectOptions(columnSort, 'diameter');
    const inputDescSort = screen.getByTestId('column-sort-input-desc');
    userEvent.click(inputDescSort);
    const inputAscSort = screen.getByTestId('column-sort-input-asc');
    userEvent.click(inputAscSort);
    const buttonSort = screen.getByTestId('column-sort-button');
    userEvent.click(buttonSort);
    userEvent.selectOptions(columnSort, 'surface_water');
    userEvent.click(inputDescSort);
    userEvent.click(buttonSort);
  });
});
