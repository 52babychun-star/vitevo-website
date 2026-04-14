import React from 'react';
import { motion } from 'motion/react';

const DNABackground: React.FC = () => {
  const particles = Array.from({ length: 40 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
      
      {/* DNA Strands Simulation */}
      <div className="absolute inset-0 opacity-20">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-primary rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: ["-10%", "110%"],
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * -20,
            }}
            style={{
              filter: "blur(1px)",
              boxShadow: "0 0 10px #00F2FF",
            }}
          />
        ))}
      </div>

      {/* Large Blurred Orbs */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default DNABackground;
