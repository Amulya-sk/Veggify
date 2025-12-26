
import Hero from '../../components/Hero'
import CategoryWrapper from '../category/CategoryWrapper'
import FeaturedSection from './FeaturedSection'
import LatestRecipe from './LatestRecipe'
import CompanyLogo from './CompanyLogo'
import Subscription from './Subscription'
const Home = () => {
  return (
    <div className="container mx-auto">
      <div className='flex flex-col justify-center items-center w-full py-20'>
        <Hero />
        <CategoryWrapper />
      </div>
      {/* Featured Section */}
      <FeaturedSection />
      <LatestRecipe />
      <CompanyLogo />
      <Subscription />

    </div>
  )
}

export default Home