import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiMessageSquare } from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  const formRef = useRef();
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.reset();
        setSuccess(true);
      }
    }, 1000);
  };

  return (
    <section id="contact" className="py-8 px-6 sm:px-10 md:px-20 bg-transparent text-white">
      <h3 className="text-4xl font-bold mb-10 text-center flex items-center justify-center gap-3 text-lime-800">
        <FiMessageSquare className="text-3xl" />
        Send us a message
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <div className="mt-8 w-full max-w-sm">
              <img
                src="/msg icon.png"
                alt="Contact Illustration"
                className="rounded-lg shadow w-full"
                draggable={false}
              />
            </div>
            <div className="space-y-4 mt-28 text-white/80 text-base">
              <div className="flex items-center gap-3">
                <FiMail className="text-xl text-indigo-400" />
                <span className="whitespace-nowrap">contactboat2.0-@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-xl text-green-400" />
                <span>022-6918-1920</span>
              </div>
              <div className="flex gap-4 pt-3">
                <a
                  href="https://www.instagram.com/boat.nirvana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:text-pink-400 hover:bg-white/20 transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/share/19gSwrYdvq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:text-blue-500 hover:bg-white/20 transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.linkedin.com/company/boat-lifestyle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:text-cyan-400 hover:bg-white/20 transition"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://x.com/RockWithboAt?t=ZGt2zpYz6RgAR2FkRd8TsA&s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:text-gray-400 hover:bg-white/20 transition"
                >
                  <FaXTwitter />
                </a>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <FiMapPin className="text-xl text-pink-400" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          ref={formRef}
          action="https://api.web3forms.com/submit"
          method="POST"
          onSubmit={handleSubmit}
          className="shadow-md rounded-xl p-6 space-y-5 bg-base-100/30 backdrop-blur border border-white/20 text-white"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <input type="hidden" name="access_key" value="af143114-594f-4d0f-83d9-a70c67e72d7a" />
          <input type="hidden" name="from_name" value="MentorX Contact Form" />
          <input type="hidden" name="subject" value="New Contact Message from MentorX" />

          <div>
            <label className="block font-medium mb-1 text-white">Your name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded border border-white/20 bg-transparent text-white placeholder-white/60"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-white">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 rounded border border-white/20 bg-transparent text-white placeholder-white/60"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-white">Write your message here</label>
            <textarea
              name="message"
              rows="6"
              required
              placeholder="Enter your message"
              className="w-full px-4 py-2 rounded border border-white/20 bg-transparent text-white placeholder-white/60"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600 transition"
          >
            Submit
          </button>

          {success && (
            <p className="text-green-400 mt-4 font-medium">✅ Message sent successfully!</p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
