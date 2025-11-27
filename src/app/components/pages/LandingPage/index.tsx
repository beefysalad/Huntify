"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { LANDING_PAGE } from "../../../constants/magic-strings";
import AuthModal from "./AuthModal";
import FeatureCard from "./FeatureCard";
import { Header } from "../../shared/Header";
import Hero from "./Hero";
import PulsingBackground from "../../shared/PulsingBackground";

export enum AuthMode {
  SIGNIN = "signin",
  SIGNUP = "signup",
}
const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SIGNIN);

  const handleOpenAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };
  return (
    <div className='relative min-h-screen bg-black text-white overflow-hidden'>
      <PulsingBackground />

      <Header handleOpenAuth={handleOpenAuth} />

      {/* Hero Section */}
      <div className='relative z-10 container mx-auto px-4 pt-20 pb-32'>
        <Hero handleOpenAuth={handleOpenAuth} />

        {/* Features Grid */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className='grid md:grid-cols-3 gap-6 mt-32 max-w-5xl mx-auto'
        >
          {LANDING_PAGE.FEATURES.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </div>
  );
};

export default LandingPage;
