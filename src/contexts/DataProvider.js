import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../helpers/APIFetch';
import DataContext from './DataContext';

function DataProvider({ children }) {
  const [plntData, setPlntData] = useState([]);
  const [svdFltrs, setSvdFltrs] = useState([]);
  const [nmfltr, setNmFltr] = useState('');
  const [fltrdData, setFltrdData] = useState([]);
  const [shldRndr, setRndr] = useState(false);
  const [fltrState, setFltrState] = useState({});

  const contexts = {
    plntData,
    setPlntData,
    svdFltrs,
    setSvdFltrs,
    fltrState,
    setFltrState,
    nmfltr,
    setNmFltr,
    fltrdData,
    setFltrdData,
    shldRndr };

  useEffect(() => {
    const dataFetchFormatter = () => {
      fetchPlanets()
        .then((result) => {
          setPlntData(result);
          setRndr(true);
        });
    };
    dataFetchFormatter();
  }, []);

  return (
    <DataContext.Provider
      value={ contexts }
    >
      { children }
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default DataProvider;
