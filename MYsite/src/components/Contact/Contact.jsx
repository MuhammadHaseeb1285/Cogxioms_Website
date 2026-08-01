import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiGlobe, FiMapPin, FiSend, FiCheck, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '../../lib/emailjs';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const response = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        e.target
      );
      
      console.log("SUCCESS!", response.status, response.text);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.log("FAILED...", error);
      alert("Failed to send the message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: 'Email',
      value: 'haseebarif1285@gmail.com',
      link: 'mailto:haseebarif1285@gmail.com',
      color: 'var(--accent-blue)'
    },
    {
      icon: <FiPhone />,
      title: 'Phone',
      value: '+923130107453',
      link: 'tel:+923130107453',
      color: '#10b981'
    },
    {
      icon: <FiGlobe />,
      title: 'Website',
      value: 'www.cogxioms.com',
      link: 'https://www.cogxioms.com',
      color: 'var(--accent-purple)'
    },
    {
      icon: <FiMapPin />,
      title: 'Location',
      value: 'Pakistan',
      link: '#',
      color: '#f59e0b'
    }
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, href: '#', color: '#0077b5' },
    { icon: <FaTwitter />, href: '#', color: '#1da1f2' },
    { icon: <FaGithub />, href: '#', color: '#333' },
    { icon: <FaInstagram />, href: '#', color: '#e4405f' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Background Elements */}
      <div className="contact-bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      <div className="contact-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>Contact Us</span>
          <motion.h2
            className="contact-title"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's Create Something
            <span className="gradient-text"> Amazing</span>
            <span className="title-accent"> Together</span>
          </motion.h2>
          
          <motion.p
            className="contact-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ready to transform your ideas into reality? Let's discuss your project and bring your vision to life.
          </motion.p>
        </motion.div>

        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Information */}
          <motion.div
            className="contact-info-section lets-talk-visual"
            variants={itemVariants}
          >
            <div className="lets-talk-heading">
              <span className="lets-text">Let's</span><br />
              <span className="talk-text">Talk!</span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-section"
            variants={formVariants}
          >
            <div className="form-card">
              <motion.h3 
                className="form-title"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Start Your Project
              </motion.h3>

              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="success-icon">
                      <FiCheck />
                    </div>
                    <h4>Message Sent Successfully!</h4>
                    <p>We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="form-group">
                      <div className="input-wrapper">
                        <FiUser className="input-icon" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setActiveField('name')}
                          onBlur={() => setActiveField('')}
                          className={activeField === 'name' ? 'active' : ''}
                          required
                        />
                        <label htmlFor="name" className={formData.name ? 'filled' : ''}>
                          Your Name
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-wrapper">
                        <FiMail className="input-icon" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setActiveField('email')}
                          onBlur={() => setActiveField('')}
                          className={activeField === 'email' ? 'active' : ''}
                          required
                        />
                        <label htmlFor="email" className={formData.email ? 'filled' : ''}>
                          Your Email
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-wrapper">
                        <FiMessageSquare className="input-icon" />
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          onFocus={() => setActiveField('subject')}
                          onBlur={() => setActiveField('')}
                          className={activeField === 'subject' ? 'active' : ''}
                          required
                        />
                        <label htmlFor="subject" className={formData.subject ? 'filled' : ''}>
                          Subject
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="textarea-wrapper">
                        <FiMessageSquare className="input-icon" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onFocus={() => setActiveField('message')}
                          onBlur={() => setActiveField('')}
                          className={activeField === 'message' ? 'active' : ''}
                          rows="5"
                          required
                        />
                        <label htmlFor="message" className={formData.message ? 'filled' : ''}>
                          Your Message
                        </label>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      className="submit-button"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <span className="button-text">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </span>
                      <motion.div
                        className="button-icon"
                        animate={isSubmitting ? { rotate: 360 } : {}}
                        transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                      >
                        {isSubmitting ? <div className="spinner"></div> : <FiSend />}
                      </motion.div>
                      <div className="button-glow"></div>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;