import Background from '../assets/images/DYOPBHero.png'
import IsFeatured from '../components/IsFeatured'
// import Logo from '../assets/images/AELogo.png'

function Home() {
  return (
    <div>
    <div 
      // style={{ backgroundImage: `url(${ Background })`}} 
      className='flex flex-row justify-center mx-auto'>
    </div>
    <div>
    <div className="footer-logo-container">
          <img src={Background} alt="Design Your Own Plant Baby" />
      </div>
    </div>
    <IsFeatured />
    </div>
  )
}

export default Home