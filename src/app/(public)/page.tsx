import Hero from '@/components/home/Hero'
import Journey from '@/components/home/Journey'
import ParallaxStrip from '@/components/home/ParallaxStrip'
import Championship from '@/components/home/Championship'
import Stages from '@/components/home/Stages'
import Categories from '@/components/home/Categories'
import Packages from '@/components/home/Packages'
import Discover from '@/components/home/Discover'
import FinalCTA from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Journey />
      <Categories />
      <ParallaxStrip />
      <Championship />
      <Stages />
      <Packages />
      <Discover />
      <FinalCTA />
    </>
  )
}
