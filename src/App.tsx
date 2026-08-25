import React, { useState } from 'react';
import { NetworkBackground } from './components/NetworkBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueSection } from './components/ValueSection';
import { WhatYouWillLearn } from './components/WhatYouWillLearn';
import { AfricaSmeFocus } from './components/AfricaSmeFocus';
import { WhoShouldAttend } from './components/WhoShouldAttend';
import { WhyAttend } from './components/WhyAttend';
import { RegistrationForm } from './components/RegistrationForm';
import { RegistrationModal } from './components/RegistrationModal';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterClick = () => {
    const registerElement = document.getElementById('register');
    if (registerElement) {
      registerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // highlight registration form momentarily
      const formInput = document.getElementById('reg-name');
      if (formInput) {
        setTimeout(() => formInput.focus(), 600);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-gradient-to-b from-[#e8f4fc] via-[#f2f8fd] to-[#eaf3fb] text-[#0f2147] selection:bg-[#2563eb] selection:text-white">
      
      {/* Background Graphic Nodes */}
      <NetworkBackground />

      {/* Top Navbar */}
      <Navbar 
        onRegisterClick={handleRegisterClick} 
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Above-the-fold Hero */}
        <Hero onRegisterClick={handleRegisterClick} />

        {/* Webinar Value Section: AI Beyond the Regular Chatbot */}
        <ValueSection />

        {/* What You'll Explore */}
        <WhatYouWillLearn />

        {/* Africa & SME Focus Section */}
        <AfricaSmeFocus />

        {/* Who Should Attend */}
        <WhoShouldAttend />

        {/* Why You Should Attend */}
        <WhyAttend />

        {/* Dedicated On-Page Registration Section */}
        <section className="py-16 md:py-24 relative overflow-hidden" id="register">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RegistrationForm />
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA onRegisterClick={handleRegisterClick} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Access Modal if opened from specific interactions */}
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
