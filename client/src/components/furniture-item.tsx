import {
  MapPin,
  Package,
  BedDouble,
  Ungroup,
  Grid2x2,
  LayoutPanelLeft,
} from "lucide-react"
import { Link } from "@tanstack/react-router"

const FurnitureItem = () => {
  return (
    <Link to="/home">
      <div className="flex flex-col">
        <div className="relative overflow-hidden rounded-xl border-none">
          <div className="flex h-60 sm:h-56">
            <div className="relative min-w-0 flex-[0_0_100%]">
              <img
                className="h-full w-full border-none object-cover"
                src="https://i5.walmartimages.com/asr/05a3974d-5eb0-445b-a42e-339456f82c03.386a1cd5c2ff736b125210f6ad0ec9e7.jpeg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="text-muted-foreground pt-2 text-sm">
          <div className="w-full truncate">
            <h3 className="truncate font-semibold capitalize">Sofa Bed</h3>
            <span className="flex items-center gap-1">
              <MapPin className="size-5" />
              <span className="text-foreground/90 font-medium">
                Quezon City, Philippines
              </span>
            </span>
            <div className="text-foreground mt-2 flex flex-wrap gap-2 text-sm">
              <div className="bg-secondary flex items-center gap-1 rounded-sm px-1.5 py-1 text-xs font-semibold">
                <BedDouble className="size-4" />
                <p>1 Bedroom</p>
              </div>
              <div className="bg-secondary flex items-center gap-1 rounded-sm px-1.5 py-1 text-xs font-semibold">
                <Grid2x2 className="size-4" />
                <p>82x60</p>
              </div>

              <div className="bg-secondary flex items-center gap-1 rounded-sm px-1.5 py-1 text-xs font-semibold">
                <Package className="size-4" />
                <p>With storage</p>
              </div>

              <div className="bg-secondary flex items-center gap-1 rounded-sm px-1.5 py-1 text-xs font-semibold">
                <LayoutPanelLeft className="size-4" />
                <p>2 Pull out</p>
              </div>

              <div className="bg-secondary flex items-center gap-1 rounded-sm px-1.5 py-1 text-xs font-semibold">
                <Ungroup className="size-4" />
                <p>L Shape</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between capitalize">
          <div className="text-muted-foreground text-sm">
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
