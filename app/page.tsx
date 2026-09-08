import { Hero } from '@/components/portfolio/hero';
import { SiteHeader, SiteFooter } from '@/components/portfolio/site-shell';
import { ProjectCarousel } from '@/components/portfolio/project-carousel';
import { Playground } from '@/components/portfolio/playground';
import { About, Contact } from '@/components/portfolio/about-contact';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <ProjectCarousel />
        <Playground />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
