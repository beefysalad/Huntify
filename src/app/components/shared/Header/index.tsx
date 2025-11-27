import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthMode } from "../../pages/LandingPage";
import { HEADER } from "../../../constants/magic-strings";

interface IHeader {
  handleOpenAuth: (mode: AuthMode) => void;
}

export const Header = ({ handleOpenAuth }: IHeader) => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='relative z-10 container mx-auto px-4 py-6 flex justify-between items-center'
    >
      <div className='flex items-center gap-2'>
        <Briefcase className='w-8 h-8 text-purple-500' />
        <span className='text-3xl font-bold'>{HEADER.APP_NAME}</span>
      </div>
      <div className='flex gap-3'>
        <Button
          variant='ghost'
          onClick={() => handleOpenAuth(AuthMode.SIGNIN)}
          className='text-white hover:bg-purple-600/20 hover:text-purple-300'
        >
          {HEADER.SIGN_IN_BUTTON}
        </Button>
        <Button
          onClick={() => handleOpenAuth(AuthMode.SIGNUP)}
          className='bg-purple-600 hover:bg-purple-700 text-white'
        >
          {HEADER.SIGN_UP_BUTTON}
        </Button>
      </div>
    </motion.nav>
  );
};
