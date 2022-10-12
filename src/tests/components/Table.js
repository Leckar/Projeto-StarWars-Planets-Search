import React, { useContext } from 'react';
import DataContext from '../../contexts/DataContext';

function Table() {
  const { planetData, shouldRender } = useContext(DataContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Url</th>
          <th>Created</th>
          <th>Edited</th>
        </tr>
      </thead>
      <tbody>
        {shouldRender && planetData.length > 0 ? planetData.map((e) => (
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
            <td>{e.films}</td>
            <td>{e.url}</td>
            <td>{e.created}</td>
            <td>{e.edited}</td>
          </tr>
        )) : null}
      </tbody>
    </table>

  );
}

export default Table;
