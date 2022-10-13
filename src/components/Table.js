import React, {
  useContext, /* , useEffect , useState */
  useEffect,
} from 'react';
import DataContext from '../contexts/DataContext';
import { TABLE_HEADERS } from '../helpers/StandardValues';

function Table() {
  const { plntData, shldRndr, fltrdData,
    nmfltr, svdFltrs, setFltrdData } = useContext(DataContext);

  const dataFilterByString = (arr) => arr.filter(({ name }) => name.toLowerCase()
    .includes(nmfltr));

  const dataFilterByValues = (arr) => {
    console.log(svdFltrs);
    const newData = arr.filter((planet) => svdFltrs
      .every(({ comparison, column, value }) => {
        if (comparison === 'maior que' && planet[column] !== 'unknown') {
          return +planet[column] > +value;
        }
        if (comparison === 'menor que' && planet[column] !== 'unknown') {
          return +planet[column] < +value;
        }
        if (comparison === 'igual a' && planet[column] !== 'unknown') {
          return +planet[column] === +value;
        }
        return false;
      }));
    setFltrdData(newData);
  };
  useEffect(() => {
    const newArr = dataFilterByString(plntData);
    if (svdFltrs.length > 0) return dataFilterByValues(newArr);
    setFltrdData(newArr);
  }, [nmfltr, svdFltrs, plntData]);

  return (
    <main>
      <table>
        <thead>
          <tr>
            {TABLE_HEADERS.map((e) => (
              <th key={ e }>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shldRndr && fltrdData.length > 0 ? fltrdData.map((e) => (
            <tr key={ e.name }>
              <td>{e.name}</td>
              <td>{e.rotation_period}</td>
              <td>{e.orbital_period}</td>
              <td>{e.diameter}</td>
              <td>{e.climate}</td>
              <td>{e.gravity}</td>
              <td>{e.terrain}</td>
              <td>{e.surface_water}</td>
              <td>{e.population}</td>
              <td>{e.films.map((film, i) => <span key={ i }>{`${film} `}</span>)}</td>
              <td>{e.url}</td>
              <td>{e.created}</td>
              <td>{e.edited}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </main>

  );
}

export default Table;
