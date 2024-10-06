'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HomeIcon, LucideSearch } from "lucide-react";
import React, {useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Link from "next/link";

const SearchBar = () => {

    const router = useRouter()
    const [country,setCountry]= useState<string | null >(null)
    const [phSearch,setPhSearch]=useState("SEARCH FOR A COUNTRY")
    const genRan=()=>{
        const countries = ["SEARCH FOR A COUNTRY",'Japan','Norway','Pakistan','Palestine','Germany','Russia','Qatar']
        const genRanNum = Math.floor(Math.random()*8)
        setPhSearch(countries[genRanNum])
    }

    useEffect(()=>{
        const interval = setInterval(genRan, 5000)
    },[])

    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value)
    };


  return (
    <div className=" m-0.5 p-2 flex font-mono">
    <Link href='./' className=" m-0.5 relative top-2"><HomeIcon className="fill-white"/></Link>
      <Input 
      placeholder={phSearch}
      onChange={handleInputChange}
      className="m-0.5"
      />

      <Button 
      className=" m-0.5"
      onClick={
        ()=>{
            router.push(`/${country}`)
      }
    }>
      <LucideSearch className="w-4 h-4 "/>
      </Button>

      </div>
  )
}

export default SearchBar