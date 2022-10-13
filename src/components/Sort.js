import React, { useContext, useState } from 'react';
import DataContext from '../contexts/DataContext';
import { COLUMN_OPTIONS } from '../helpers/StandardValues';

export default function Sort() {
  const [columnOptions, setColumnOptions] = useState(COLUMN_OPTIONS[0]);
  const [orderInputs, setOrderInputs] = useState('ASC');
  const { setFltrdData, fltrdData } = useContext(DataContext);

  const columnOptionsHandler = ({ target }) => {
    setColumnOptions(target.value);
  };
  const orderInputHandler = ({ target: { value } }) => {
    setOrderInputs(value);
  };
  const sortButtonHandler = () => {
    let filteredData;
    const data = fltrdData.filter((info) => info[columnOptions] !== 'unknown');
    const unknownData = fltrdData.filter((info) => info[columnOptions] === 'unknown');
    if (orderInputs === 'ASC') {
      filteredData = data.sort((a, b) => +a[columnOptions] - +b[columnOptions]);
    }
    if (orderInputs === 'DESC') {
      filteredData = data.sort((a, b) => +b[columnOptions] - +a[columnOptions]);
    }
    setFltrdData([...filteredData, ...unknownData]);
  };

  return (
    <div>
      <select
        onChange={ columnOptionsHandler }
        value={ columnOptions }
        data-testid="column-sort"
      >
        {COLUMN_OPTIONS.map((e) => (
          <option
            key={ e }
            value={ e }
            id={ e }
          >
            {e}
          </option>
        ))}
      </select>
      <label htmlFor="radio">
        ASC
        <input
          type="radio"
          name="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ orderInputHandler }
        />
        DESC
        <input
          type="radio"
          name="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ orderInputHandler }
        />
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ sortButtonHandler }
      >
        Ordenar
      </button>
    </div>
  );
}
