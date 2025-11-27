import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AuthMode } from "..";
import { LANDING_PAGE } from "../../../../constants/magic-strings";

interface IHero {
  handleOpenAuth: (mode: AuthMode) => void;
}
const Hero = ({ handleOpenAuth }: IHero) => {
  return (
    <div className='max-w-4xl mx-auto text-center'>
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-violet-400 to-purple-600 bg-clip-text text-transparent leading-tight'
      >
        {LANDING_PAGE.HERO.MAIN_TEXT_ONE}
        <br />
        {LANDING_PAGE.HERO.MAIN_TEXT_TWO}
      </motion.h1>

      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className='text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed'
      >
        {LANDING_PAGE.HERO.DESCRIPTION}
      </motion.p>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className='flex gap-4 justify-center'
      >
        <Button
          size='lg'
          onClick={() => handleOpenAuth(AuthMode.SIGNUP)}
          className='bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6'
        >
          {LANDING_PAGE.HERO.CTA_BUTTON}
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;
