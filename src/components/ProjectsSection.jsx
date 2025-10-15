import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Active Directory & DNS Homelab (Raspberry Pi)",
    description: `• Deployed and configured a Samba Active Directory Domain Controller on a Raspberry Pi running Debian\n• Configured DNS services to support domain name resolution via Samba internal DNS\n• Verified AD functionality using nslookup, host, and netstat to confirm SRV, A, and LDAP record responses\n• Created a custom domain (homelab.local) and configured static IP networking`,
    image: "/projects/raspbian-logo.png",
    tags: ["RaspberryPI/Debian", "Samba AD", "DNS"],
  },
  {
    id: 2,
    title: "URL Shortener Web App",
    description:
      "• Built a web application that converts long URLs into short, unique links using Flask \n\n • Implemented routing to handle redirections, form validation, and a simple mapping system to store and retrieve original URLs",
    image: "/projects/project2.png",
    tags: ["Python", "Flask", "HTML/CSS", "API"],

  },
  {
    id: 3,
    title: "ProjectWise Hub",
    description:
      "The ProjectWise Hub is a full-stack web application that enables: \n\n• Students: to submit projects, track progress, manage their academic profile \n\n • Faculty: to review submissions, provide grades and feedback \n\n • Administrators: to manage users, courses, and system settings",
    image: "/projects/project3.png",
    tags: ["React", "Node.js", "Typescript", "PostgreSQL"],

  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Some projects were created in a homelab environment to gain experience,
          while others were developed as part of my coursework, and lastly, some are personal projects to further enhance
          my skills.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 whitespace-pre-line">
                  {project.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {/* <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/danibarrosj"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
