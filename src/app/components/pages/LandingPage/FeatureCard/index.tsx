import React from "react";
import { motion } from "framer-motion";

interface IFeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  delay: number;
}
const FeatureCard = ({
  delay,
  description,
  icon: Icon,
  title,
}: IFeatureCardProps) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className='relative group'
    >
      <div className='absolute inset-0 bg-gradient-to-br from-purple-600/20 to-violet-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all' />
      <div className='relative bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/60 transition-all'>
        <div className='text-purple-400 mb-4'>
          <Icon className='w-8 h-8' />
        </div>
        <h3 className='text-xl font-bold mb-2 text-white'>{title}</h3>
        <p className='text-gray-400 leading-relaxed'>{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
