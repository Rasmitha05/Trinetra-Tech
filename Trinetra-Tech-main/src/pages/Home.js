import React from 'react';
import Navbar from '../components/Navbar1';
import Gallery from './FeaturesPage';
import Testimonials from './PricingPage'; // Corrected typo from Testimonialas
import Service from './Services';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
 const titles = [
   'Track and reduce your carbon footprint with real-time emission insights and data visualization.',
   'Effortless carbon tracking and sustainability management – integrating AI-driven insights for a greener future.',
   'Connecting businesses and individuals with smart emission analytics for a cleaner planet.',
   'Let our platform handle your carbon footprint calculations, supplier emissions, and sustainability goals.',
 ];


  return (
    <div>
      <Navbar />
      <main className="w-full flex flex-col pt-23 bg-cream">
        <Header
          titles={titles} // Changed from title to titles
          type="home"
        />
        <section
          id="gallery"
          className="md:max-w-[1440px] mx-auto px-4 md:px-20"
        >
          <Gallery />
        </section>
        <section
          id="testimonials"
          className="md:max-w-[1440px] mx-auto px-4 md:px-20"
        >
          <Testimonials />
        </section>
        <div className="my-12"></div> {/* Added space here */}
        <section
          id="service"
          className="md:max-w-[1440px] mx-auto px-4 md:px-20"
        >
          <Service />
        </section>
        <div className="my-12"></div> {/* Added space here */}
        
      </main>
    </div>
  );
};

export default Home;
