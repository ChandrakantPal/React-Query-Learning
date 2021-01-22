import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async ({ queryKey }) => {
  console.log(queryKey);
  const [_key, { page }] = queryKey;
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching, isPreviousData, status } = useQuery(
    ["planets", { page }],
    fetchPlanets,
    { keepPreviousData: true }
  );

  console.log({ data, isFetching, isPreviousData, status });

  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" && <div>Loading data</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() => setPage((old) => (isFetching ? old : old + 1))}
            disabled={data.next === null}
          >
            Next page
          </button>
          <div>
            {data.results?.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
