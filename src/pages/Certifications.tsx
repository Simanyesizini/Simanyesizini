import { useState, useRef, useEffect, useCallback } from 'react';
import { Award, Download, Calendar, Building2, ChevronLeft, ChevronRight, X, ExternalLink, ZoomIn, Minimize2 } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function Certifications() {
  const { data } = usePortfolio();
  const { certifications } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certifications[0] | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => carousel.removeEventListener('scroll', checkScroll);
    }
  }, [checkScroll, certifications]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying || certifications.length <= 1) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          // Reset to start
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollTo('right');
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, certifications.length]);

  const scrollTo = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.cert-card')?.clientWidth || 400;
      const gap = 24;
      const scrollAmount = cardWidth + gap;

      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('.cert-card');
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        setCurrentIndex(index);
      }
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const openCertificateViewer = (cert: typeof certifications[0]) => {
    if (cert.certificateUrl) {
      setSelectedCertificate(cert);
    }
  };

  const closeCertificateViewer = () => {
    setSelectedCertificate(null);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Certifications</h1>
            <p className="text-lg text-neutral-600">
              Formal qualifications and professional certifications that validate my expertise in
              IT Support Services.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Carousel */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {certifications.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              No certifications yet.
            </div>
          ) : (
            <div
              className="relative max-w-5xl mx-auto"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Navigation Arrows */}
              {certifications.length > 1 && (
                <>
                  <button
                    onClick={() => scrollTo('left')}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-neutral-200 transition-all ${
                      canScrollLeft ? 'hover:bg-primary-50 hover:border-primary-300 text-neutral-600 hover:text-primary-600' : 'opacity-40 cursor-not-allowed text-neutral-400'
                    }`}
                    disabled={!canScrollLeft}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => scrollTo('right')}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-neutral-200 transition-all ${
                      canScrollRight ? 'hover:bg-primary-50 hover:border-primary-300 text-neutral-600 hover:text-primary-600' : 'opacity-40 cursor-not-allowed text-neutral-400'
                    }`}
                    disabled={!canScrollRight}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Carousel Container */}
              <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
              >
                {certifications.map((cert, index) => (
                  <div
                    key={cert.id || index}
                    className="cert-card flex-shrink-0 w-[350px] md:w-[400px] snap-center select-none"
                  >
                    <div className="card overflow-hidden h-full">
                      {/* Certificate Type Badge */}
                      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-6 flex flex-col items-center justify-center text-center relative">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
                          <Award className="w-8 h-8" />
                        </div>
                        <span className="text-sm font-semibold uppercase tracking-wider">
                          {cert.type}
                        </span>
                        <span className="text-xs mt-1 opacity-80">{cert.year}</span>
                        {isAutoPlaying && index === currentIndex && (
                          <div className="absolute bottom-2 right-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          </div>
                        )}
                      </div>

                      {/* Certificate Details */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                            {cert.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Building2 className="w-4 h-4" />
                            <span>{cert.institution}</span>
                          </div>
                        </div>

                        <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                          {cert.description}
                        </p>

                        {cert.hasCertificate && cert.certificateUrl ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => openCertificateViewer(cert)}
                              className="btn-secondary text-sm px-4 py-2 flex-1 justify-center"
                            >
                              <ZoomIn className="w-4 h-4 mr-2" />
                              View
                            </button>
                            <a
                              href={cert.certificateUrl}
                              download={cert.name.replace(/\s+/g, '_')}
                              className="btn-outline text-sm px-4 py-2 flex-1 justify-center"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </a>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-primary-600 font-medium bg-primary-50 px-4 py-3 rounded-lg">
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                            Currently in progress
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots Navigation */}
              {certifications.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {certifications.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-primary-600 w-6'
                          : 'bg-neutral-300 hover:bg-neutral-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Qualifications Summary */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <h2 className="mb-8 text-center">Qualifications Summary</h2>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6 bg-white text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                  {certifications.filter(c => c.type === 'Diploma' || c.type === 'Certificate').length}
                </h3>
                <p className="text-sm text-neutral-600">Formal Qualifications</p>
              </div>

              <div className="card p-6 bg-white text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                  {certifications.filter(c => !c.hasCertificate && c.year.includes('Present')).length}
                </h3>
                <p className="text-sm text-neutral-600">Active Training Program</p>
              </div>

              <div className="card p-6 bg-white text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                  {certifications.length}+
                </h3>
                <p className="text-sm text-neutral-600">Years of IT Education</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-4">Download My Full CV</h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            Get a complete overview of my qualifications, experience, and skills in one document.
          </p>
          <a
            href="/Simanye_Tevin_Sizini_CV.pdf"
            download
            className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100 inline-flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download CV
          </a>
        </div>
      </section>

      {/* Certificate Viewer Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeCertificateViewer}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-semibold text-neutral-900">{selectedCertificate.name}</h3>
                <p className="text-sm text-neutral-500">{selectedCertificate.institution}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedCertificate.certificateUrl && (
                  <>
                    <a
                      href={selectedCertificate.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a
                      href={selectedCertificate.certificateUrl}
                      download={selectedCertificate.name.replace(/\s+/g, '_')}
                      className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600"
                      title="Download"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </>
                )}
                <button
                  onClick={closeCertificateViewer}
                  className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-4 bg-neutral-100">
              {selectedCertificate.certificateUrl ? (
                selectedCertificate.certificateUrl.startsWith('data:application/pdf') ||
                selectedCertificate.certificateUrl.endsWith('.pdf') ? (
                  // PDF Viewer
                  <iframe
                    src={selectedCertificate.certificateUrl}
                    title={selectedCertificate.name}
                    className="w-full h-full min-h-[60vh] rounded-lg"
                  />
                ) : (
                  // Image Viewer
                  <div className="flex items-center justify-center h-full min-h-[60vh]">
                    <img
                      src={selectedCertificate.certificateUrl}
                      alt={selectedCertificate.name}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                    />
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-full min-h-[60vh] text-neutral-500">
                  No certificate preview available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
