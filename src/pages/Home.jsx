import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';
import Hero from '../components/Home/Hero';
import Count from '../components/Home/Count';
import GetStarted from '../components/Home/GetStarted';
import Supported from '../components/Home/Supported';
import GetStartedToday from '../components/Home/GetStartedToday';
import Protocols from '../components/Home/Protocols/Protocols';

const Home = () => {
  return (
    <>
        <NavBar />
        <Hero />
        {/* <Count /> */}
        <Protocols />
        <GetStarted />
        <Supported />
        <GetStartedToday />
        <Footer />
    </>
  )
}

export default Home;