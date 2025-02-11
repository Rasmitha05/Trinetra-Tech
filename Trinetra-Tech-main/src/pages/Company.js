import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { factory, youtube, aws, tesla, google } from '../images'; // Import actual images

const companies = [
  {
    name: 'Tesla',
    position: 'Sustainable Energy Leader ⚡',
    image: tesla,
    description:
      'Leading the charge in electric vehicles & clean energy innovation.',
  },
  {
    name: 'AWS Data Centers',
    position: 'Cloud Computing & Server Emissions ☁️',
    image: aws,
    description:
      'Optimizing server efficiency & reducing IT carbon footprints.',
  },
  {
    name: 'YouTube',
    position: 'Streaming & Digital Carbon Impact 🎥',
    image: youtube,
    description: 'Tracking video streaming’s environmental impact worldwide.',
  },
  {
    name: 'Google',
    position: 'AI & Sustainable Tech 🌍',
    image: google,
    description: 'Investing in renewable energy & carbon-neutral data centers.',
  },
  {
    name: 'Industrial Factories',
    position: 'Manufacturing & Emissions 🏭',
    image: factory,
    description: 'Analyzing emissions from large-scale production industries.',
  },
];

const CompaniesSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-10 px-4 md:px-20 bg-gray-900">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center text-white">
        Our Carbon Footprint Partners 🌱
      </h2>
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {companies.map((company, index) => (
            <div key={index} className="px-4">
              <div className="bg-gray-800 rounded-lg shadow-lg text-center flex flex-col max-w-xs mx-auto">
                <div className="flex flex-1">
                  <div className="w-1/2 bg-white text-gray-900 flex flex-col items-center justify-center p-4 rounded-l-lg">
                    <img
                      src={company.image}
                      alt={company.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white"
                    />
                    <h3 className="text-lg font-semibold">{company.name}</h3>
                  </div>
                  <div className="w-1/2 bg-gray-800 text-white p-4 rounded-r-lg flex flex-col justify-between">
                    <h4 className="text-md font-semibold">
                      {company.position}
                    </h4>
                    <p className="text-gray-400 mb-4">{company.description}</p>
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CompaniesSlider;
