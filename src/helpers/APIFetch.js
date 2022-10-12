import { ENDPOINT_URL, PLANETS_ROUTE } from './Endpoints';

function fetchPlanets(target = PLANETS_ROUTE) {
  const data = fetch(`${ENDPOINT_URL}${target}`)
    .then((response) => response.json())
    .then(({ results }) => (results));
  return data;
}

export default fetchPlanets;
