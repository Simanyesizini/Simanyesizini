import { Link } from 'react-router-dom';
import { Download, GraduationCap, Briefcase, Cpu } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function Home() {
  const { data } = usePortfolio();
  const { profile, education, experience } = data;

  const latestEducation = education[0];
  const currentExperience = experience[0];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-neutral-200 border-4 border-white shadow-xl overflow-hidden">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Hero Content */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="mb-4">{profile.name}</h1>
              <p className="text-lg md:text-xl text-primary-600 font-medium mb-4">
                {profile.tagline}
              </p>
              <blockquote className="text-lg md:text-xl text-neutral-600 italic mb-6 border-l-4 border-primary-500 pl-4">
                "{profile.quote}"
              </blockquote>

              {/* Summary */}
              <p className="text-neutral-600 mb-8 max-w-2xl">
                {profile.bio}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/Simanye_Tevin_Sizini_CV.pdf"
                  download
                  className="btn-primary"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">Quick Overview</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              A brief summary of my professional profile and key highlights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Education Highlight */}
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Education</h3>
              <p className="text-neutral-600 text-sm mb-2">
                {latestEducation?.title || 'No education listed'}
              </p>
              <p className="text-neutral-500 text-sm">
                {latestEducation?.institution || ''} {latestEducation?.year ? `, ${latestEducation.year}` : ''}
              </p>
            </div>

            {/* Program Highlight */}
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {currentExperience?.type || 'Experience'}
              </h3>
              <p className="text-neutral-600 text-sm mb-2">
                {currentExperience?.title || 'No experience listed'}
              </p>
              <p className="text-neutral-500 text-sm">
                {currentExperience?.period || ''}
              </p>
            </div>

            {/* Focus Areas */}
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Focus Areas</h3>
              <p className="text-neutral-600 text-sm">
                IT Support, Troubleshooting, Networking, End-user Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Bring IT Excellence to Your Team
          </h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            Seeking an entry-level IT Support position where I can apply my technical knowledge
            and passion for problem-solving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link to="/experience" className="btn-outline border-neutral-600 text-white hover:bg-neutral-800">
              View My Experience
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
