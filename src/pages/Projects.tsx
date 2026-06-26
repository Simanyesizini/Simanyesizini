import { Code, Server, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function Projects() {
  const { data } = usePortfolio();
  const { projects } = data;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Projects</h1>
            <p className="text-lg text-neutral-600">
              Showcasing practical technical ability through completed projects and academic work.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="mb-12 text-center">Featured Projects</h2>

          {projects.length === 0 ? (
            <div className="max-w-2xl mx-auto">
              <div className="card p-8 bg-white border-2 border-dashed border-neutral-300 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  No projects yet
                </h3>
                <p className="text-neutral-600">Projects will be displayed here once added.</p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              {projects.map((project, index) => (
                <div key={project.id || index} className="card overflow-hidden">
                  {/* Project Header */}
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-white/20 text-sm font-medium rounded-full mb-3">
                          {project.type}
                        </span>
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${project.status === 'Completed' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                        <span className="text-sm font-medium">{project.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                          Role
                        </h4>
                        <p className="text-neutral-900 font-medium mb-6">{project.role}</p>

                        <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                          Overview
                        </h4>
                        <p className="text-neutral-600 mb-6">{project.overview}</p>

                        <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="bg-neutral-50 rounded-xl p-6">
                        <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                          Outcome & Impact
                        </h4>
                        <p className="text-neutral-600">{project.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="mb-4 text-center">Skills Demonstrated</h2>
          <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
            Key competencies applied across my project work.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card p-6 bg-white text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Application Development
              </h3>
              <p className="text-sm text-neutral-600">
                Building functional web applications that solve real problems.
              </p>
            </div>

            <div className="card p-6 bg-white text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Server className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Systems Design</h3>
              <p className="text-sm text-neutral-600">
                Understanding how to design systems that improve workflows.
              </p>
            </div>

            <div className="card p-6 bg-white text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">User Focus</h3>
              <p className="text-sm text-neutral-600">
                Creating solutions with the end-user experience in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-4">Want to Learn More?</h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            Connect with me to discuss my projects or potential collaboration opportunities.
          </p>
          <Link
            to="/contact"
            className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100 inline-flex items-center"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
