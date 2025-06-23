// src/pages/Index.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/landingPage/Hero";
import Features from "../components/landingPage/Features";
import CallToAction from "../components/landingPage/CallToAction";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;