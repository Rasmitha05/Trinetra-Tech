import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar2';
import Maps from '../components/Map';
import TiltedImageCard from '../components/TiltedImageCard';
import line from '../images/line.png';
import jar from '../images/jar.png';
import bar1 from '../images/bar2.png';
import streak from '../images/streak.png';
import carbon from '../images/carbon.jpeg';
import bonsai from '../images/bonsai.jpeg';
import leader from '../images/leader.jpeg';
import iot from '../images/iot.png';

const Home1 = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeSubComponent, setActiveSubComponent] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const parts = hash.split('-');

      const validSections = [
        'data-visualization',
        'solutions',
        'achievements',
        'pricing',
      ];
      const validSubComponents = {
        'data-visualization': ['line', 'bar', 'jar'],
        solutions: ['emission-calculator', 'iot-devices'],
        achievements: ['streak', 'leaderboard'],
        pricing: ['bonsai'],
      };

      if (parts.length === 1) {
        for (const section of Object.keys(validSubComponents)) {
          if (validSubComponents[section].includes(parts[0])) {
            setActiveSection(section);
            setActiveSubComponent(parts[0]);
            return;
          }
        }
      } else if (validSections.includes(parts[0])) {
        setActiveSection(parts[0]);
        setActiveSubComponent(parts.slice(1).join('-'));
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (activeSection) {
      const sectionElement = document.getElementById(activeSection);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection, activeSubComponent]);

  return (
    <div className="bg-[#1A1A2E] text-white min-h-screen">
      <Navbar />
      {['data-visualization', 'solutions', 'achievements', 'pricing'].map(
        (section) => (
          <section
            key={section}
            id={section}
            className="h-screen flex flex-col items-center justify-center"
          >
            {activeSection === section && activeSubComponent ? (
              <>
                {section === 'data-visualization' &&
                  {
                    line: (
                      <TiltedImageCard
                        title="Line Chart"
                        imageSrc={line}
                        description="Trends over time."
                      />
                    ),
                    bar: (
                      <TiltedImageCard
                        title="Bar Chart"
                        imageSrc={bar1}
                        description="Category comparison."
                      />
                    ),
                    jar: (
                      <TiltedImageCard
                        title="Jar Visualization"
                        imageSrc={jar}
                        description="Carbon levels."
                      />
                    ),
                  }[activeSubComponent]}
                {section === 'solutions' &&
                  {
                    emissioncalculator: (
                      <TiltedImageCard
                        title="Emission Calculator"
                        imageSrc={carbon}
                        description="Calculate emissions."
                      />
                    ),
                    iotdevices: (
                      <TiltedImageCard
                        title="IoT Devices"
                        imageSrc={iot}
                        description="Monitor emissions."
                      />
                    ),
                  }[activeSubComponent]}
                {section === 'achievements' &&
                  {
                    streak: (
                      <TiltedImageCard
                        title="Streak"
                        imageSrc={streak}
                        description="Track streaks."
                      />
                    ),
                    leaderboard: (
                      <TiltedImageCard
                        title="Leaderboard"
                        imageSrc={leader}
                        description="Compete in sustainability."
                      />
                    ),
                  }[activeSubComponent]}
                {section === 'pricing' && activeSubComponent === 'bonsai' && (
                  <TiltedImageCard
                    title="Bonsai"
                    imageSrc={bonsai}
                    description="Bonsai pricing plans."
                  />
                )}
              </>
            ) : (
              {
                'data-visualization': (
                  <TiltedImageCard
                    title="Jar Visualization"
                    imageSrc={jar}
                    description="Carbon levels."
                  />
                ),
                solutions: (
                  <TiltedImageCard
                    title="Emission Calculator"
                    imageSrc={carbon}
                    description="Calculate emissions."
                  />
                ),
                achievements: (
                  <TiltedImageCard
                    title="Streak"
                    imageSrc={streak}
                    description="Track streaks."
                  />
                ),
                pricing: (
                  <TiltedImageCard
                    title="Bonsai"
                    imageSrc={bonsai}
                    description="Bonsai pricing plans."
                  />
                ),
              }[section]
            )}
          </section>
        )
      )}
      <Maps />
    </div>
  );
};

export default Home1;
