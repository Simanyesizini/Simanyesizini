import { useEffect, useRef, useState } from 'react';
import { Award, BookOpen, Trophy, Users, Calendar, Building2 } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Award,
  Trophy,
  Users
};

export default function Education() {
  const { data } = usePortfolio();
  const { education, achievements } = data;
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [education]);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Education & Achievements</h1>
            <p className="text-lg text-neutral-600">
              A timeline of my academic journey and accomplishments in the field of IT Support
              Services.
            </p>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="mb-16 text-center">Educational Background</h2>

          <div className="max-w-4xl mx-auto" ref={timelineRef}>
            {education.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">
                No education entries yet.
              </div>
            ) : (
              <div className="relative">
                {/* Timeline vertical line */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-500 to-primary-300 rounded-full" />

                {/* Timeline items */}
                <div className="space-y-12">
                  {education.map((item, index) => (
                    <div
                      key={item.id || index}
                      data-index={index}
                      className={`timeline-item relative flex items-start gap-4 md:gap-8 transition-all duration-700 ease-out ${
                        visibleItems.has(index)
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                      }`}
                    >
                      {/* Timeline dot and connector */}
                      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                        {/* Dot */}
                        <div className={`w-4 h-4 rounded-full border-4 border-white shadow-lg z-10 transition-colors duration-300 ${
                          visibleItems.has(index) ? 'bg-primary-600' : 'bg-neutral-300'
                        }`} />
                        {/* Connector to card */}
                        <div className={`hidden md:block absolute top-6 w-8 h-0.5 transition-colors duration-300 ${
                          index % 2 === 0 ? 'right-full bg-primary-200' : 'left-full bg-primary-200'
                        }`} />
                      </div>

                      {/* Content */}
                      <div
                        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                          index % 2 === 0
                            ? 'md:mr-auto md:pr-8'
                            : 'md:ml-auto md:pl-8'
                        }`}
                      >
                        <div
                          className={`card p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                            index % 2 === 0 ? 'md:text-left' : 'md:text-left'
                          }`}
                        >
                          {/* Year badge */}
                          <div className={`inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4 ${
                            index % 2 === 0 ? '' : ''
                          }`}>
                            <Calendar className="w-4 h-4" />
                            {item.year}
                          </div>

                          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                            {item.title}
                          </h3>

                          <div className="flex items-center gap-2 text-primary-600 font-medium mb-3">
                            <Building2 className="w-4 h-4" />
                            <span>{item.institution}</span>
                          </div>

                          <p className="text-neutral-600 text-sm leading-relaxed">
                            {item.description}
                          </p>

                          {/* Timeline indicator line on card */}
                          <div className={`absolute top-8 w-1 h-8 bg-gradient-to-b ${
                            index % 2 === 0
                              ? 'right-0 bg-gradient-to-l from-primary-300 to-transparent'
                              : 'left-0 bg-gradient-to-r from-primary-300 to-transparent'
                          } md:hidden`} />
                        </div>
                      </div>

                      {/* Empty space for alternating layout on desktop */}
                      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                    </div>
                  ))}
                </div>

                {/* Timeline end marker */}
                <div className="flex justify-center mt-8">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary-600 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <h2 className="mb-4 text-center">Achievements & Involvement</h2>
          <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
            Key milestones and involvements that have shaped my professional development.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {achievements.map((item, index) => {
              const Icon = iconMap[item.icon] || Award;
              return (
                <div
                  key={item.id || index}
                  className="card p-6 bg-white hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-4">View My Certifications</h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            See my formal qualifications and professional certifications.
          </p>
          <a
            href="/certifications"
            className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100"
          >
            View Certifications
          </a>
        </div>
      </section>
    </div>
  );
}
