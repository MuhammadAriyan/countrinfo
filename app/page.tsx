'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface DataObj {
  name: string;
  officialName?: string;
  capital?: string;
  population?: number;
  continent?: string[];
  flag?: string;
}

const CountryInfo = () => {
  const [data, setData] = useState<null | DataObj>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  async function fetchData(param1: string) {
    try {
      param1 = param1.trim().toLowerCase();
      console.log(param1);

      const res = await fetch(`https://restcountries.com/v3.1/name/${param1}`);

      if (!res.ok) {
        throw new Error("Invalid country");
      }

      const jsData = await res.json();

      // If jsData is not valid, handle it with an error state
      if (!jsData || jsData.status === 404) {
        setError(true);
        setData(null);
        return;
      }

      const dataObj: DataObj = {
        name: jsData[0]?.name.common,
        officialName: jsData[0]?.name.official,
        capital: jsData[0]?.capital,
        population: jsData[0]?.population,
        continent: jsData[0]?.continents,
        flag: jsData[0]?.flags.png,
      };

      console.log(dataObj);
      setData(dataObj);
      setError(false);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setError(true);
      setData(null);
    }
  }

  return (
    <div className="bg-my-bg h-screen justify-center content-center p-1 font-mono font-bold truncate">
      <Card className=" border-4 border-black bg-transparent text-black  m-2 sm:m-1/6 md:m-1/4 lg:m-1/3 xl:m-1/2 p-3 truncate">
        <CardHeader>
          <CardTitle className="text-center text-white bg-black p-3 rounded-md truncate">COUNTRINFO</CardTitle>
        </CardHeader>
        <CardContent>
          <input
          type='text'
            placeholder="ENTER ANY COUNTRY"
            className="text-center flex min-h-[60px] w-full rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-black dark:focus-visible:ring-neutral-300"
            onChange={(event) => {
              fetchData(event.target.value);
            }}
          />
        </CardContent>
        <CardDescription className="text-center text-white">
          {!isLoading && !error && data && (
            <div className=' p-2 text-black'>
              <h1>NAME: {data?.name}</h1>
              <h1>OFFICIAL NAME: {data?.officialName}</h1>
              <h1>CAPITAL: {data?.capital}</h1>
              <h1>CONTINENT: {data?.continent?.join(', ')}</h1>
              <h1>POPULATION: {data?.population}</h1>
              <img className='mx-auto rounded-lg m-2' src={data?.flag} alt={data?.officialName + " flag"} />
            </div>
          )}
          {error && <p className=' text-black'>No data found for the entered input.</p>}
        </CardDescription>
      </Card>
    </div>
  );
};

export default CountryInfo;
