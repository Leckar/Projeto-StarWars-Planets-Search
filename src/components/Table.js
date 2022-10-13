import React, {
  useContext, /* , useEffect , useState */
  useEffect,
} from 'react';
import DataContext from '../contexts/DataContext';
import { TABLE_HEADERS } from '../helpers/StandardValues';

function Table() {
  const { plntData, shldRndr, fltrdData,
    nmfltr, svdFltrs, setFltrdData } = useContext(DataContext);

  useEffect(() => {
    const newArr = plntData.filter(({ name }) => name.toLowerCase().includes(nmfltr));
    setFltrdData(newArr);
    if (svdFltrs.length > 0) {
      const newData = newArr.filter((eMajor) => svdFltrs.some((eMinor) => {
        if (eMinor.comparison === 'maior que' && eMajor[eMinor.column] !== 'unknown') {
          return +eMajor[eMinor.column] > +eMinor.value;
        }
        if (eMinor.comparison === 'menor que' && eMajor[eMinor.column] !== 'unknown') {
          return +eMajor[eMinor.column] < +eMinor.value;
        }
        if (eMinor.comparison === 'igual a' && eMajor[eMinor.column] !== 'unknown') {
          return +eMajor[eMinor.column] === +eMinor.value;
        }
        return false;
      }));
      setFltrdData(newData);
    }
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
