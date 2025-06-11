import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}
export default HomeLayout
