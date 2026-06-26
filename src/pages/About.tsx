import { Target, Eye, Briefcase, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function About() {
  const { data } = usePortfolio();
  const { profile } = data;
  const { about } = profile;

  const iconMap: Record<string, React.ElementType> = {
    Briefcase,
    Heart,
    Target,
    Eye,
    User: Briefcase,
    Code: Briefcase,
    Server: Briefcase,
    Users: Briefcase
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">About Me</h1>
            <p className="text-lg text-neutral-600">
              A dedicated IT professional with a passion for technology and problem-solving,
              building a career in IT support and systems.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Background */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Personal Background</h2>
              <div className="text-neutral-600 space-y-4 leading-relaxed whitespace-pre-line">
                {about.personalBackground}
              </div>
            </div>
            <div className="bg-neutral-100 rounded-xl p-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900">At a Glance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-neutral-500">Location</p>
                    <p className="font-medium text-neutral-900">{data.contact.location}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-neutral-500">Education</p>
                    <p className="font-medium text-neutral-900">{data.education[0]?.title?.split(' ').slice(0, 3).join(' ') || 'IT Support'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-neutral-500">Current Status</p>
                    <p className="font-medium text-neutral-900">{data.experience[0]?.title || 'Intern at CAPACITI'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-neutral-500">Focus</p>
                    <p className="font-medium text-neutral-900">IT Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Background */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="mb-6">Professional Background</h2>
            <div className="text-neutral-600 space-y-4 leading-relaxed whitespace-pre-line">
              {about.professionalBackground}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Vision</h3>
              <p className="text-neutral-600 leading-relaxed">
                {about.vision}
              </p>
            </div>

            <div className="card p-8">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Mission</h3>
              <p className="text-neutral-600 leading-relaxed">
                {about.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Goals */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="mb-8">Career Goals</h2>
            <div className="flex flex-col md:flex-row gap-4">
              {about.careerGoals.map((goal, index) => (
                <div key={index} className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-semibold text-neutral-900">
                      {goal.split(' - ')[0]}
                    </span>
                  </div>
                  <div className="flex-1 card p-4 bg-white">
                    <p className="text-sm text-neutral-600">
                      {goal.split(' - ')[1] || goal}
                    </p>
                  </div>
                  {index < about.careerGoals.length - 1 && (
                    <div className="hidden md:flex items-center justify-center my-2">
                      <ArrowRight className="w-6 h-6 text-neutral-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Interests */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="mb-8 text-center">Professional Interests</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {about.interests.map((item, index) => {
              const Icon = iconMap[item.icon] || Briefcase;
              return (
                <div key={index} className="card p-4 text-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-neutral-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reflective Questions */}
      <section className="section-padding bg-neutral-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-white mb-8 text-center">Reflective Positioning</h2>
            <div className="space-y-6">
              <div className="bg-neutral-800 rounded-xl p-6">
                <p className="text-neutral-500 text-sm font-light mb-3 italic">
                  What motivates me?
                </p>
                <p className="text-neutral-200 leading-relaxed font-medium">
                  {about.reflectiveMotivation}
                </p>
              </div>
              <div className="bg-neutral-800 rounded-xl p-6">
                <p className="text-neutral-500 text-sm font-light mb-3 italic">
                  What impact do I want to make in my career?
                </p>
                <p className="text-neutral-200 leading-relaxed font-medium">
                  {about.reflectiveImpact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-4">Let's Connect</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing opportunities, sharing ideas, or connecting with fellow
            IT professionals.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-primary-600 hover:bg-neutral-100">
            Get in Touch
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
