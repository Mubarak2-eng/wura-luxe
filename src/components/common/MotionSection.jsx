import { motion, useReducedMotion } from 'framer-motion'

export default function MotionSection({
  children,
  className = '',
  delay = 0,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.5,
        delay,
        ease: [0.25, 1, 0.5, 1], // Slow-luxury easing curve
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
