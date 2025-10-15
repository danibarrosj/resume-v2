import { ArrowDown } from "lucide-react";
import { Reveal } from "../components/Reveal.jsx";

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span> Hi, I'm</span>
              <span className="text-primary"> Daniel J.</span>
              <span className="text-gradient ml-2"> Barros</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto">
              I build secure and efficient IT environments through hands-on experience in network operations, system support, and cybersecurity. Passionate about reliability and continuous learning, 
              I create solutions that keep systems connected and users supported.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="pt-4">
              <a href="#projects" className="cosmic-button">View My Profesional Summary</a>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.3}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
          <ArrowDown className="h-5 w-5 text-primary" />
        </div>
      </Reveal>
    </section>
  );
};
