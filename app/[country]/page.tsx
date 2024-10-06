'use client'

import { useEffect } from "react"
import React, { useState } from 'react'
import { TriangleAlert } from "lucide-react"

import {
  Card,
  CardDescription,
} from "@/components/ui/card"
import Loader from "@/components/loader";

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
      setIsLoading(false)
    }
  }
  useEffect(()=>{
    console.log(params , params?.country);
    
        fetchData(params?.country)
  },[params?.country])

  return (
    <div className="bg-my-bg bg-cover bg-no-repeat min-h-screen flex items-center justify-center p-4 font-mono">
      <Card className="w-full max-w-3xl border-4 border-blue-500 bg-white bg-opacity-90 p-6 md:p-10 rounded-lg shadow-xl">
        <div className="text-center text-white xl:text-lg lg:text-base md:text-sm sm:text-xs break-words whitespace-normal">
          {!isLoading && !error && data && (
            <div className=' pb-3 pt-3 text-black'>
              <h1>NAME: {data?.name}</h1>
              <h1>OFFICIAL NAME: {data?.officialName}</h1>
              <h1>CAPITAL: {data?.capital}</h1>
              <h1>CONTINENT: {data?.continent?.join(', ')}</h1>
              <h1>POPULATION: {data?.population}</h1>
              <img className='mx-auto rounded-lg m-2' src={data?.flag} alt={data?.officialName + " flag"} />
            </div>
          )}
          {error && <div className='text-red-600 flex items-center justify-center'>
            <TriangleAlert className="mr-2" /> 
            <span>No data found for the entered input.</span>
          </div>
          }
          {isLoading &&
            <div className=" flex justify-center items-center">
            <Loader/>
            </div>
          }
        </div>
      </Card>
    </div>
  );
};

export default CountryInfo;
