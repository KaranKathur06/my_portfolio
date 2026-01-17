import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
