import { SmoothCursor } from "@/components/ui/smooth-cursor";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import AboutPage from "./components/About";
import SkillPage from "./components/Skill";
import ProjectPage from "./components/Project";
import Certficate from "./components/certificate";
import SocialCard from "./components/Media";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen scroll-smooth"> {/* aktifkan smooth scroll global */}
      <Navbar />

      <section id="home">
        <HomePage />
      </section>

      <section id="about">
        <AboutPage />
      </section>

      <section id="skills">
        <SkillPage />
      </section>

      <section id="project">
        <ProjectPage />
      </section>

      <section id="certificate">
        <Certficate />
      </section>

      <section id="social">
        <SocialCard />
      </section>

      <Footer />
    </div>
  );
}
