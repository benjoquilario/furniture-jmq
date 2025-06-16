import Main from "@/components/main"
import db from "@/lib/db"

const Home = async () => {
  const furnitures = await db.furniture.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: true,
      seller: true,
    },
  })

  return <Main data={furnitures} />
}
export default Home
