import { Link } from "@tanstack/react-router"
import { X, Facebook, Instagram, Linkedin, Bed } from "lucide-react"

const Footer = () => {
  return (
    <footer className="mt-9 border-t">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col gap-4 md:flex-1">
            <div className="inline-flex">
              <Link to="/home" className="flex-start flex-col">
                {/* <Image src={logo} fill alt={`${APP_NAME} logo`} /> */}
                <div className="flex items-center gap-2 border-b border-black text-xl font-extrabold tracking-[0.3em]">
                  <div>JMQ</div>
                  <Bed className="size-6" />
                </div>
                <span className="text-[15px] font-semibold tracking-widest uppercase">
                  furnitures.
                </span>
              </Link>
            </div>
            <p className="text-foreground/70 text-sm leading-6">
              Small, artisan label that offers a thoughtfully curated collection
              of high quality everyday essentials made.
            </p>
            <div className="flex items-center gap-2">
              <a href="https://instagram.com">
                <Instagram />
              </a>
              <a href="https://instagram.com">
                <Facebook />
              </a>
              <a href="https://instagram.com">
                <X />
              </a>
              <a href="https://instagram.com">
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="mt-4 flex justify-between md:mt-0 md:flex-[2] md:justify-around">
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="text-foreground/70 mt-2 space-y-2 text-sm">
                <li>About</li>
                <li>Stores</li>
                <li>FAQ</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Contact</h4>
              <ul className="text-foreground/70 mt-2 space-y-2 text-sm">
                <li>What's up</li>
                <li>Support 24/7</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Legal</h4>
              <ul className="text-foreground/70 mt-2 space-y-2 text-sm">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>How it works</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 text-left">
        2024 JMQ Furnitures. All Rights reserved.
      </div>
    </footer>
  )
}

export default Footer
