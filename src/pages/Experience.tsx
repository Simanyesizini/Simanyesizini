import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function Experience() {
  const { data } = usePortfolio();
  const { experience } = data;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Work Experience</h1>
            <p className="text-lg text-neutral-600">
              Building professional experience through structured training and practical learning
              opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Experience */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="mb-12 text-center">Current Experience</h2>

          <div className="max-w-3xl mx-auto">
            {experience.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">
                No experience entries yet.
              </div>
            ) : (
              experience.map((item, index) => (
                <div key={item.id || index} className="card p-8 bg-white border-l-4 border-l-primary-600 mb-6 last:mb-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900">{item.title}</h3>
                      <p className="text-primary-600 font-medium">{item.organization}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-4 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                        {item.period}
                      </span>
                      <p className="text-sm text-neutral-500 mt-1">{item.type}</p>
                    </div>
                  </div>

                  <p className="text-neutral-600 mb-6">{item.description}</p>

                  <div className="border-t border-neutral-100 pt-4">
                    <h4 className="text-sm font-semibold text-neutral-900 mb-3">Key Focus Areas:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-center gap-2 text-sm text-neutral-600">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Skills Developed */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="mb-8 text-center">Skills & Competencies Developed</h2>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Technical Support',
                'Problem Solving',
                'Teamwork',
                'Communication',
                'IT Systems',
                'User Support',
                'Professionalism',
                'Adaptability',
              ].map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-3 bg-neutral-50 rounded-lg text-center text-sm font-medium text-neutral-700"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reflective Question */}
      <section className="section-padding bg-neutral-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white mb-6">Reflective Question</h2>
            <div className="bg-neutral-800 rounded-xl p-8">
              <h3 className="text-lg font-semibold mb-4">
                What responsibilities helped me grow professionally?
              </h3>
              <p className="text-neutral-300 leading-relaxed text-left">
                Through my CAPACITI training and academic projects, I have grown by taking on
                responsibilities that pushed me beyond my comfort zone. Handling technical
                challenges, collaborating with diverse team members, and presenting solutions to
                problems have all contributed to my professional development. Each responsibility
                has taught me the importance of thorough preparation, clear communication, and a
                methodical approach to problem-solving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-4">Explore My Projects</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            See the practical work I have completed that demonstrates my technical abilities.
          </p>
          <Link to="/projects" className="btn-primary bg-white text-primary-600 hover:bg-neutral-100">
            View Projects
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
