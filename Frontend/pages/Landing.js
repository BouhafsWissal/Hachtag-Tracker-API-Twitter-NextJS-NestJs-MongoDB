import Banner from '../components/Banner/Banner';
import Companies from '../components/Companies/Companies';
import Provide from '../components/Provide/index';
import Why from '../components/Why/index';

import Clientsay from '../components/Clientsay/index';
import Newsletter from '../components/Newsletter/Newsletter';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <main> 
       <Navbar />
      <Banner />
      <Companies />
     
      <Provide />
      <Why />
    
      <Clientsay />
      <Newsletter /> 
      <Footer />
    </main>
  )
}




