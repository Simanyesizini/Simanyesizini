import { Link } from 'react-router-dom';
import { Mail, Linkedin, Phone, Lock } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Education', path: '/education' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Simanye Sizini</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              IT Support Technician with a passion for solving technical problems and supporting
              efficient digital environments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:Simanyetevin@gmail.com"
                className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                Simanyetevin@gmail.com
              </a>
              <a
                href="tel:+27640951511"
                className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                064 095 1511
              </a>
              <a
                href="https://www.linkedin.com/in/simanye-sizini"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              &copy; {currentYear} Simanye Tevin Sizini. All rights reserved.
            </p>
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
