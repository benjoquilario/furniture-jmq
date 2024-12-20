"use client"

import Link from "next/link"
import Image from "next/image"
import { MdLocationOn, MdStorage, MdOutlineShapeLine } from "react-icons/md"
import { CgPullClear } from "react-icons/cg"
import { SlSizeActual } from "react-icons/sl"
import { IoIosBed } from "react-icons/io"

const FurnitureItem = () => {
  return (
    <Link href="/">
      <div className="flex flex-col">
        <div className="relative overflow-hidden rounded-xl">
          <div className="flex h-60 sm:h-56">
            <div className="relative min-w-0 flex-[0_0_100%]">
              <img
                className="h-full w-full object-cover"
                src="https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/470242419_451883037955904_2438041876195600147_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHy4jV3YVVUlwxUXcNjQN4ULVG4kGF0a64tUbiQYXRrrubmMmq3AXAKxe3yXm1FE8l8UOGDpasNjO1w8pDSGaT5&_nc_ohc=ly7sCSaAF18Q7kNvgHXuyHK&_nc_oc=Adg2m8HZLtpvUUUCfZcdi5vIjFwS6cLDAbfiipFDnYHsts9imiO6IYP2fkQ38uNsI_0&_nc_zt=23&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=A_BjjY-gt-1hIhj5FcpliDa&oh=00_AYDQ92T-N2LsMlDLXmk-hYT_SmgCDkjtAKTiJHB0syBPUA&oe=6767433B"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="pt-2 text-sm text-muted-foreground">
          <div className="w-full truncate">
            <h3 className="truncate font-semibold capitalize">Sofa Bed</h3>
            <span className="flex items-center gap-1">
              <MdLocationOn />
              <span className="font-medium text-foreground/90">
                Quezon City, Philippines
              </span>
            </span>
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-foreground">
              <div className="flex items-center gap-1 rounded-sm bg-secondary px-1.5 py-1 text-sm font-bold">
                <IoIosBed />
                <p>1 Bedroom</p>
              </div>
              <div className="flex items-center gap-1 rounded-sm bg-secondary px-1.5 py-1 text-sm font-bold">
                <SlSizeActual />
                <p>82x60</p>
              </div>

              <div className="flex items-center gap-1 rounded-sm bg-secondary px-1.5 py-1 text-sm font-bold">
                <MdStorage />
                <p>With storage</p>
              </div>

              <div className="flex items-center gap-1 rounded-sm bg-secondary px-1.5 py-1 text-sm font-bold">
                <CgPullClear />
                <p>2 Pull out</p>
              </div>

              <div className="flex items-center gap-1 rounded-sm bg-secondary px-1.5 py-1 text-sm font-bold">
                <MdOutlineShapeLine />
                <p>L Shape</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between capitalize">
          <div className="text-sm text-muted-foreground">
            <p>For Sell</p>
            <p>Sofa Bed</p>
          </div>
          <p className="text-base font-semibold first-letter:font-medium">
            ₱30, 000
          </p>
        </div>
      </div>
    </Link>
  )
}
export default FurnitureItem
