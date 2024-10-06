'use client'

import { useEffect } from "react"
import React, { useState } from 'react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DataObj {
  name?: string;
  officialName?: string;
  capital?: string;
  population?: number;
  continent?: string[];
  flag?: string;
}

const CountryInfo = ({params}:{params:{country:string}}) => {
  const [data, setData] = useState<null | DataObj>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  async function fetchData(param1: string) {
    try {
      param1 = param1.trim().toLowerCase();
      console.log(param1);

      const res = await fetch(`https://restcountries.com/v3.1/name/${param1}`);

      if (!res.ok) {
        throw new Error("Invalid country...");
      }

      const jsData = await res.json();

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
  useEffect(()=>{
    console.log(params , params?.country);
    
        fetchData(params?.country)
  },[params?.country])

  return (
    <div className="bg-my-bg h-screen justify-center content-center p-1 font-mono font-bold truncate">
      <Card className=" border-4 border-black bg-transparent text-black  m-2 sm:m-1/6 md:m-1/4 lg:m-1/3 xl:m-1/2 p-3 truncate">
        <CardHeader>
          <CardTitle className="text-center text-white bg-black p-3 rounded-md truncate">COUNTRINFO</CardTitle>
        </CardHeader>
        <div className="text-center text-white">
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
          {error && <CardDescription className=' text-black'>No data found for the entered input.</CardDescription>}
        </div>
      </Card>
    </div>
  );
};

export default CountryInfo;
