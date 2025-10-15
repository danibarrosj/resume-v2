import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Veteran IT Support & Systems Administrator 
            </h3>

            <p className="text-muted-foreground">
              Motivated IT professional with hands-on experience in network operations, technical support, 
              and system administration. Skilled in troubleshooting VLANs, DNS/DHCP, 
            , that took part in the resolution in over +1000 tickets. Adept at maintaining reliable network performance and 
               providing quick, efficient technical solutions in both academic and 
               enterprise environments.
            </p>

            <p className="text-muted-foreground">
              Highly disciplined and detail-oriented, with a background in the U.S. Marine Corps
               and advanced education in Computer Science and Business Administration (MBA). 
               Certified in Network+, Security+, CySA+, and CSAP, currently pursuing 
               CCNA while expanding practical cybersecurity and virtualization 
               skills through homelab projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <a
                href="\projects\Daniel Jaime Barros Resume.pdf"
                download
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Technical Support </h4>
                  <p className="text-muted-foreground">
                    Providing reliable front-line assistance to users by diagnosing 
                    and resolving hardware, software, and network issues efficiently.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Network Troubleshooting</h4>
                  <p className="text-muted-foreground">
                    Identifying and resolving connectivity problems across VLANs, switches,
                     and access points to maintain smooth network operations.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">System Setup & Maintenance</h4>
                  <p className="text-muted-foreground">
                    Imaging, configuring, and maintaining desktops, laptops, and lab environments
                    to ensure consistent performance and reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
