import HeroSection from '@/components/HeroSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import TimelineSection from '@/components/TimelineSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative w-full">
      <HeroSection />
      <ShowcaseSection />
      <TimelineSection />
      <ExpertiseSection />
      <Footer />
    </main>
  );
}