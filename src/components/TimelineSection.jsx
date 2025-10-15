import { Reveal } from "../components/Reveal.jsx";
import { GraduationCap, Briefcase, Award, Code2, Network, Monitor, ShieldAlert, Package, Calculator, Flag, Medal } from "lucide-react";
const TIMELINE = [
    {
    date: "Exp. Dec 2025",
    title: "Master of Science in Computer Science and Information Tehnology",
    org: "Sacred Heart University",
    icon: <GraduationCap className="h-4 w-4" />,
    desc:
      "Upsilon Pi Epsilon (UPE) Honor Society. Dean's List. GPA: 3.92/4.0",
  },
  {
    date: "Aug 2025",
    title: "Network Technician",
    org: "Sacred Heart University",
    icon: <Network className="h-4 w-4" />,
desc: `• Monitored and triaged tickets via the university’s network management system, performing root cause analysis and tracking issue resolution across VLANs, switches, and access points.

• Executed L1 troubleshooting of Ethernet and wireless connectivity, DNS resolution, and DHCP lease issues before escalating to network engineering team.

• Configured and tested network hardware (routers, managed switches, patch panels), maintained IDF/MDF closet standards, and documented topology changes using CISCO DNAC and internal knowledge base.`,
  },
  {
    date: "Mar 2025",
    title: "IT Service Desk & Support",
    org: "Sacred Heart University",
    icon: <Monitor className="h-4 w-4" />,
  desc: `• Resolved and participated in over 1,250+ technical support tickets through in-person, phone, and remote sessions, addressing issues across hardware, software, network, and AV systems.
    
    • Assisted with imaging, configuration, and deployment of university-issued laptops and desktops, including user account management, password resets, and system activations.
    
    • Supported malware diagnostics and coordinated with IT Security to remediate system discrepancies and security alerts.`,
  },{
    date: "Dec 2024",
    title: "Master of Business Administration (MBA)",
    org: "Sacred Heart University",
    icon: <GraduationCap className="h-4 w-4" />,
    desc:
      "Honor's Graduate. Dean's List. GPA: 3.86/4.0",
  },
  {
    date: "Dec 2023",
    title: "Bachelor of Arts in Business Administration (BBA)",
    org: "Sacred Heart University",
    icon: <GraduationCap className="h-4 w-4" />,
    desc:
      "Dean's List. GPA: 3.56/4.0",
  },
  {
  date: "Oct 2023",
  title: "End of Service (USMC)",
  org: "Honorable Discharge",
  icon: <Medal className="h-4 w-4" />,
  desc: `• Completed over 5 years of honorable service, supporting logistics, operations, and IT functions across multiple commands in Okinawa, Japan.

• Earned multiple commendations and letters of appreciation for professionalism, reliability, and mission accomplishment.

• Transitioned to civilian life with advanced leadership, communication, and technical skills applied to higher education and IT disciplines.`,
},

  {
  date: "Feb 2022 - May 2023",
  title: "Operations Clerk / Help Desk",
  org: "U.S. Marine Corps, Okinawa, Japan",
  icon: <ShieldAlert className="h-4 w-4" />,
  desc: `• Managed the maintenance, logistics, and security of $10,000,000 in war simulation equipment, ensuring operational readiness and availability for training exercises.

    • Served as the first point of contact for technical assistance with operational systems and hardware, delivering timely and efficient resolutions to support mission-critical operations.

    • Oversaw accountability for over 200 Marines during field and base operations, maintaining accurate personnel tracking, training records, and assignments through both digital and manual systems.`,
  },
  {
  date: "Jun 2019 - Feb 2022",
  title: "Warehouse Administrator",
  org: "U.S. Marine Corps, Okinawa, Japan",
  icon: <Package className="h-4 w-4" />,
  desc: `• Administered the procurement, storage, and distribution of over $10,000,000 in food and facility supplies to support operational readiness.

    • Managed daily requisitioning, purchasing, and receiving of over $5,000 in supplies, ensuring uninterrupted service and accurate inventory control.

    • Prepared detailed supply and backorder reports to optimize inventory levels and maintain compliance with federal logistics standards.`,
  },
  {
  date: "Nov 2018 - Jun 2019",
  title: "Accountant & Human Resources Representative",
  org: "U.S. Marine Corps, Okinawa, Japan",
  icon: <Calculator className="h-4 w-4" />,
  desc: `• Balanced and reconciled daily financial transactions for over 2,000 daily meals.

• Estimated and forecasted supply and ingredient requirements to optimize cost control and reduce waste.

• Diagnosed and corrected discrepancies in inventory and accounting systems, improving accuracy and resource allocation efficiency.`,
},
  {
  date: "Mar 2018",
  title: "Enlisted (USMC)",
  org: "Recruit Training, Parris Island, SC",
  icon: <Flag className="h-4 w-4" />,
  desc: `• Completed rigorous 13-week Marine Corps Recruit Training focused on discipline, leadership, physical endurance, and adaptability.

• Developed foundational skills in teamwork, time management, and mission execution under high-pressure environments.

• Earned distinction for integrity and reliability, establishing a professional foundation for future military and technical roles.`,
},
];

export const TimelineSection = () => {
  return (
    <section id="timeline" className="relative py-24 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Timeline</h2>

      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-border" />
        <ol className="space-y-12">
          {TIMELINE.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <li key={idx} className="relative grid md:grid-cols-2">
                <div className={isLeft ? "" : "hidden md:block"} />

                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-2 h-4 w-4 rounded-full bg-primary shadow ring-4 ring-background"
                  aria-hidden="true"
                />
                <div className="absolute left-1/2 -translate-x-1/2 top-5 flex items-center justify-center h-8 w-8 rounded-full bg-card border">
                  {item.icon}
                </div>

                <div className={`mt-8 md:mt-0 ${isLeft ? "md:pr-10 md:col-start-1" : "md:pl-10 md:col-start-2"}`}>
                  <Reveal>
                    <article className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-xs uppercase tracking-wide text-foreground/60">
                        {item.date}
                      </div>
                      <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                      <p className="text-sm text-foreground/80">{item.org}</p>
                      <p className="text-sm text-muted-foreground mt-3 whitespace-pre-line leading-relaxed">
                        {item.desc}
                      </p>
                      {item.linkHref && (
                        <a href={item.linkHref} className="inline-block mt-3 text-primary hover:underline text-sm">
                          {item.linkText ?? "Learn more"}
                        </a>
                      )}
                    </article>
                  </Reveal>
                </div>

                <div className={!isLeft ? "" : "hidden md:block"} />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};