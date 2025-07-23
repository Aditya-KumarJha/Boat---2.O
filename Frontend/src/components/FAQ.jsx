import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Truck,
  ShieldCheck,
  Undo2,
  Info
} from 'lucide-react';

const faqs = [
  {
    icon: <Truck className="text-[#22d3ee] w-6 h-6" />,
    question: 'Do you offer free shipping?',
    answer: 'Yes, all orders come with free standard shipping across India. You’ll receive tracking details once your order ships.',
  },
  {
    icon: <Undo2 className="text-[#22d3ee] w-6 h-6" />,
    question: 'Can I return or exchange my product?',
    answer: 'We offer a 30-day return and exchange policy. The product must be in its original condition with all packaging intact.',
  },
  {
    icon: <ShieldCheck className="text-[#22d3ee] w-6 h-6" />,
    question: 'Do Boat 2.0 products come with a warranty?',
    answer: 'Absolutely. All products are backed by a 1-year warranty covering manufacturing defects. Claim via our support portal.',
  },
  {
    icon: <Info className="text-[#22d3ee] w-6 h-6" />,
    question: 'Where can I get support?',
    answer: 'For any queries, you can reach us via the support section or email. We typically respond within 24 hours.',
  },
];

const FAQ = () => {
  return (
    <section className="py-20 px-6 sm:px-10 md:px-20 text-[#f5f5dc]">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3 text-[#22d3ee]"
      >
        <Info className="w-7 h-7" />
        Frequently Asked Questions
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-10 md:px-20 lg:px-1">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{ scale: 1.025 }}
          >
            <Card className="bg-transparent border border-[#22d3ee]/30 shadow-md hover:shadow-cyan-400/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {faq.icon}
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{faq.question}</h3>
                    <p className="text-sm leading-relaxed text-[#f5f5dc]/80">{faq.answer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
