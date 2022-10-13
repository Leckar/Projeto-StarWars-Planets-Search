import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../contexts/DataContext';
import { COLUMN_OPTIONS, OPERATOR_OPTIONS } from '../helpers/StandardValues';
import Sort from './Sort';

function Filters() {
  const { fltrState, setFltrState,
    setSvdFltrs, svdFltrs, setNmFltr } = useContext(DataContext);
  const [fltrdColumn, setColumn] = useState(COLUMN_OPTIONS);

  useEffect(() => {
    setFltrState({
      column: fltrdColumn[0],
      comparison: OPERATOR_OPTIONS[0],
      value: '0',
    });
  }, []);

  const nameFilterHandler = ({ target }) => {
    const { value } = target;
    setNmFltr(value);
  };

  const columnChangeHandler = ({ target }) => {
    setFltrState((prev) => (
      {
        ...prev, column: target.value,
      }
    ));
  };
  const operatorChangeHandler = ({ target }) => {
    setFltrState((prev) => (
      {
        ...prev, comparison: target.value,
      }
    ));
  };
  const numericInputHandler = ({ target }) => {
    setFltrState((prev) => (
      {
        ...prev, value: target.value,
      }
    ));
  };
  const filterButtonHandler = () => {
    setSvdFltrs((prev) => [...prev, fltrState]);
    setFltrState({
      column: fltrdColumn[0],
      comparison: OPERATOR_OPTIONS[0],
      value: '0',
    });
    setColumn(fltrdColumn.filter((e) => fltrState.column !== e));
  };
  const removeAllFiltersButtonHandler = () => {
    setFltrState({
      column: COLUMN_OPTIONS[0],
      comparison: OPERATOR_OPTIONS[0],
      value: '0',
    });
    setSvdFltrs([]);
    setColumn(COLUMN_OPTIONS);
  };
  const removeTargetFilterHandler = ({ target: { id } }) => {
    setColumn([...fltrdColumn, id]);
    setSvdFltrs(svdFltrs.filter((e) => e.column !== id));
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
          value={ fltrState.column }
          onChange={ columnChangeHandler }
        >
          {fltrdColumn.map((e) => (
            <option key={ e } value={ e }>{e}</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          value={ fltrState.comparison }
          onChange={ operatorChangeHandler }
        >
          {OPERATOR_OPTIONS.map((e) => (
            <option key={ e } value={ e }>{e}</option>
          ))}
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ fltrState.value }
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
      <Sort />
      <div>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ removeAllFiltersButtonHandler }
        >
          Remover todos os filtros
        </button>

      </div>
      <div>
        {svdFltrs.map(({ comparison, column, value }, i) => (
          <span
            data-testid="filter"
            key={ i }
          >
            {`${column} ${comparison} ${value}`}
            <button
              id={ column }
              type="button"
              onClick={ removeTargetFilterHandler }
            >
              X
            </button>
          </span>
        ))}
      </div>
    </section>
  );
}

export default Filters;
