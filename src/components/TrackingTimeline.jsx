import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';

export default function TrackingTimeline({ steps }) {
  return (
    <div className="py-6">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start mb-8 last:mb-0"
        >
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {step.completed ? (
              <BsCheckCircleFill className="w-6 h-6 text-green-500" />
            ) : (
              <BsCircle className="w-6 h-6 text-gray-300" />
            )}
          </div>
          <div className="ml-4 flex-grow">
            <h4 className={`font-semibold ${step.completed ? 'text-green-500' : 'text-gray-500'}`}>
              {step.title}
            </h4>
            {step.completed && (
              <p className="text-sm text-gray-500">
                {format(new Date(), 'MMM d, yyyy h:mm a')}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}