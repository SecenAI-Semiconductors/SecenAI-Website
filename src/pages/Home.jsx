import Hero from '../sections/Hero'
import DroneCategories from '../sections/DroneCategories'
import FeaturedDrone from '../sections/FeaturedDrone'
import Features from '../sections/Features'
import VideoShowcase from '../sections/VideoShowcase'
// import Stats from '../sections/Stats'
// import Testimonials from '../sections/Testimonials'
import CTABanner from '../sections/CTABanner'

export default function Home() {
  return (
    <>
      <Hero />
      <DroneCategories />
      <FeaturedDrone />
      <Features />
      <VideoShowcase />
      {/* <Stats /> */}
      {/* <Testimonials /> */}
      <CTABanner />
    </>
  )
}
