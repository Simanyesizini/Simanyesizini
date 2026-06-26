import { useState } from 'react';
import { Mail, Phone, Linkedin, MapPin, Download, Send, CheckCircle, Github, Twitter } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function Contact() {
  const { data } = usePortfolio();
  const { contact } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Contact Me</h1>
            <p className="text-lg text-neutral-600">
              I'm open to opportunities and connections. Feel free to reach out!
            </p>
          </div>
        </div>
      </section>

      {/* CV Download & Contact Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* CV Download Button */}
            <div className="card p-8 bg-primary-50 border-primary-100 mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    Download My CV
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Get a complete overview of my qualifications and experience.
                  </p>
                </div>
                <a
                  href="/Simanye_Tevin_Sizini_CV.pdf"
                  download
                  className="btn-primary flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="card p-6 bg-white text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                  <p className="text-sm text-neutral-600">{contact.email}</p>
                </a>
              )}

              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="card p-6 bg-white text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Phone</h3>
                  <p className="text-sm text-neutral-600">{contact.phone}</p>
                </a>
              )}

              {contact.linkedinUrl && (
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-6 bg-white text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Linkedin className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1">LinkedIn</h3>
                  <p className="text-sm text-neutral-600">{contact.linkedin || 'Connect'}</p>
                </a>
              )}
            </div>

            {/* Social Links */}
            {(contact.github || contact.twitter) && (
              <div className="flex justify-center gap-4 mb-12">
                {contact.github && (
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                )}
                {contact.twitter && (
                  <a
                    href={contact.twitter.startsWith('@') ? `https://twitter.com/${contact.twitter.slice(1)}` : contact.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    {contact.twitter}
                  </a>
                )}
              </div>
            )}

            {/* Contact Form */}
            <div className="card p-8 bg-white">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Send a Message</h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full md:w-auto">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary-600" />
              <span className="text-neutral-600">Based in {contact.location}</span>
            </div>
            <p className="text-neutral-500 text-sm">
              Open to opportunities locally and remotely.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
