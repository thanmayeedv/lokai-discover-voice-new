import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceCategories from '@/components/ServiceCategories';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <section className="container mx-auto px-4 py-16">
          <ServiceCategories />
        </section>
      </main>
    </div>
  );
};

export default Index;
