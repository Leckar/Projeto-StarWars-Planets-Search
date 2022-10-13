import React, { useContext, /* useEffect , */ useState } from 'react';
import DataContext from '../contexts/DataContext';

function Filters() {
  const { /* svdFltrs, setSvdFltrs, */ setNmFltr } = useContext(DataContext);
  const columnOptions = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const operatorOptions = ['maior que', 'menor que', 'igual a'];
  const [fltrdColumn, setColumn] = useState(columnOptions);
  const [columnValue, setColumnValue] = useState('');
  const [operatorValue, setOperatorValue] = useState('');
  const [valueFilter, setValue] = useState('0');
  const [fltrState, setFltrState] = useState({
    column: fltrdColumn[0],
    comparison: operatorOptions[0],
    value: '0',
  });

  const nameFilterHandler = ({ target }) => {
    const { value } = target;
    setNmFltr(value);
  };

  const columnChangeHandler = ({ target }) => {
    setColumnValue(target.value);
  };
  const operatorChangeHandler = ({ target }) => {
    setOperatorValue(target.value);
  };
  const numericInputHandler = ({ target }) => {
    setValue(target.value);
  };

  const filterButtonHandler = () => {
    setSvdFltrs((prev) => [...prev, {
      column: columnValue,
      comparison: operatorValue,
      value: valueFilter,
    }]);
    setColumn(fltrdColumn.filter((e) => columnValue !== e));
  };

  return (
    <section>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          onChange={ nameFilterHandler }
        />
        <select
          data-testid="column-filter"
          onChange={ columnChangeHandler }
        >
          {fltrdColumn.map((e) => (
            <option key={ e } value={ e }>{e}</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ operatorChangeHandler }
        >
          {operatorOptions.map((e) => (
            <option key={ e } value={ e }>{e}</option>
          ))}
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ valueFilter }
          onChange={ numericInputHandler }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ filterButtonHandler }
        >
          Filtrar
        </button>
      </div>
    </section>
  );
}

export default Filters;
