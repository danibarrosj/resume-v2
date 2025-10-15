import { ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Network+",
    issuer: "CompTIA",
    year: "Aug 2025 - Aug 2028",
    icon: "/projects/network+.png",
    demoUrl: "/projects/NetCert.png", // example link (ensure this file exists)
  },
  {
    title: "Security+",
    issuer: "CompTIA",
    year: "Aug 2025 - Aug 2028",
    icon: "/projects/Sec+.png",
    demoUrl: "/projects/SecCert.png",
  },
  {
    title: "CySA+",
    issuer: "CompTIA",
    year: "Aug 2025 - Aug 2028",
    icon: "/projects/CySA+.png",
    demoUrl: "/projects/CySACert.png",
  },
  {
    title: "CSAP",
    issuer: "CompTIA",
    year: "Aug 2025 - Aug 2028",
    icon: "/projects/CSAP.png",
    demoUrl: "/projects/CSAPCert.png",
  },
];

export const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 px-4 bg-secondary/30 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Certifications</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="relative bg-card border rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
            >
              {/* Certificate Logo (top center) */}
              <div className="flex justify-center mb-4">
                <img
                  src={cert.icon}
                  alt={`${cert.title} logo`}
                  className="h-24 w-24 object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Title & Info */}
              <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{cert.issuer}</span>
                <br />
                {cert.year}
              </p>

              {/* Bottom-left Demo Icon */}
              {cert.demoUrl && (
                <a
                  href={cert.demoUrl}
                  download
                  className="absolute bottom-4 left-4 text-foreground/70 hover:text-primary transition-colors duration-300"
                  title="Download Certificate"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};