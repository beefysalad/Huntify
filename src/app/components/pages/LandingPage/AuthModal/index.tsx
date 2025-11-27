import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { AuthMode } from "..";
import SignInTab from "./SignInTab";
import SignUpTab from "./SignUpTab";

interface IAuthModal {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: AuthMode;
}
const AuthModal = ({ isOpen, onClose, defaultMode }: IAuthModal) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50'
          />

          {/* Modal */}
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className='relative w-full max-w-md pointer-events-auto'
            >
              {/* Glowing background effect */}
              <div className='absolute inset-0 bg-gradient-to-br from-purple-600/15 to-violet-600/15 rounded-3xl blur-xl' />

              {/* Modal content */}
              <div className='relative bg-black border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden'>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className='absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10'
                >
                  <X className='w-6 h-6' />
                </button>

                <div className='p-8'>
                  <Tabs defaultValue={defaultMode} className='w-full'>
                    <TabsList className='grid w-full grid-cols-2 bg-purple-950/50 border border-purple-500/30'>
                      <TabsTrigger
                        value='signin'
                        className='data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-400'
                      >
                        Sign In
                      </TabsTrigger>
                      <TabsTrigger
                        value='signup'
                        className='data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-400'
                      >
                        Sign Up
                      </TabsTrigger>
                    </TabsList>

                    <SignInTab />

                    <SignUpTab />
                  </Tabs>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
