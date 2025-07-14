import {
  AnimatePresence,
  // eslint-disable-next-line no-unused-vars
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useRef, useState } from "react";
import {
  containerVariants,
  getChangeLangDuration,
  itemVariants,
} from "../../utils/helper";
import TextInput from "../Input/TextInput";
import SuccessModal from "../SuccessModal";
import { Send } from "lucide-react";
import { CONTACT_INFO, SOCIAL_LINKS } from "../../utils/data";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { useLang } from "../../context/LangContext";

const ContactSection = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const formRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const { i18n } = useTranslation();
  const { lang } = useLang();

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    //simulate apit call
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVIECE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
      setShowSuccess(true);
    }

    // auto hide success modal after 5 secods
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.section
          id="contact"
          ref={sectionRef}
          className={`py-24 px-6 ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          } relative overflow-hidden`}
          key={lang}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{
            duration: getChangeLangDuration("s"),
            ease: "easeInOut",
          }}
        >
          {/* background elements */}
          <motion.div
            style={{ y }}
            className="absolute inset-0 overflow-hidden"
          >
            <div
              className={`absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 ${
                isDarkMode ? "bg-blue-500" : "bg-blue-400"
              }`}
            />
            <div
              className={`absolute bottom-40 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 ${
                isDarkMode ? "bg-purple-500" : "bg-purple-400"
              }`}
            />
          </motion.div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* section header */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="text-center mb-20"
            >
              <motion.div
                variants={itemVariants}
                className={`text-sm uppercase ${
                  i18n.language === "En" ? "tracking-widest" : ""
                } ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}
              >
                {i18n.t("Let's Connect")}
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-light mb-6"
              >
                {i18n.language === "En" ? (
                  <>
                    Get In
                    <span className="text-blue-500 font-medium"> Touch</span>
                  </>
                ) : (
                  <>
                    <span className="text-blue-500 font-medium">تماس </span>
                    با من
                  </>
                )}
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className={`text-xl max-w-2xl mx-auto ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {/* Ready to start your next project? Let's discuss how we can bring your ideas to life. */}
                {i18n.t("contact subtitle")}
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* contact form */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                <motion.div
                  variants={itemVariants}
                  className={`p-8 rounded-2xl border ${
                    isDarkMode
                      ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                      : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                  }`}
                >
                  <h3 className="text-2xl font-medium mb-8">
                    {i18n.t("Send me a message")}
                  </h3>

                  <form ref={formRef} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <TextInput
                        isDarkMode={isDarkMode}
                        value={formData.name}
                        id="name"
                        handleInputChange={(text) =>
                          handleInputChange("name", text)
                        }
                        label={i18n.t("Your Name")}
                      />

                      <TextInput
                        isDarkMode={isDarkMode}
                        label={i18n.t("Email Address")}
                        value={formData.email}
                        id="email"
                        handleInputChange={(text) =>
                          handleInputChange("email", text)
                        }
                      />
                    </div>

                    <TextInput
                      isDarkMode={isDarkMode}
                      label={i18n.t("Your Message")}
                      value={formData.message}
                      id="message"
                      textarea
                      handleInputChange={(text) =>
                        handleInputChange("message", text)
                      }
                    />
                    <motion.button
                      disabled={isSubmitting}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white py-4 rounded-xl text-sm uppercase ${
                        i18n.language === "En" ? "tracking-wider" : ""
                      } font-medium transition-all duration-300 flex items-center justify-center space-x-2`}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-white border-t-transparent rounded-full"
                          />
                          <span>{i18n.t("Sending")}...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>{i18n.t("Send Message")}</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>

              {/* contact info & social links */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
                className="space-y-8"
              >
                {/* contact Informations */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-medium mb-6">
                    {i18n.t("Contact Information")}
                  </h3>
                  <div className="space-y-4">
                    {CONTACT_INFO.map((info) => (
                      <motion.div
                        key={info.label}
                        variants={itemVariants}
                        whileHover={{ x: 4 }}
                        className={`flex items-center space-x-4 rounded-xl ${
                          isDarkMode
                            ? "bg-gray-800/30 hover:bg-gray-800/50"
                            : "bg-gray-50/50 hover:bg-gray-100/50"
                        } transition-all duration-300`}
                        onClick={() => {
                          navigator.clipboard
                            .writeText(i18n.t(info.value))
                            .then(() => {
                              alert("Copied to clipboard!");
                            })
                            .catch((err) => {
                              console.error("Failed to copy: ", err);
                            });
                        }}
                      >
                        <div
                          className={`p-3 rounded-lg ${
                            isDarkMode ? "bg-gray-700" : "bg-white"
                          }`}
                        >
                          <info.icon size={20} className="text-blue-500" />
                        </div>
                        <div>
                          <div
                            className={`text-sm ${
                              isDarkMode ? "text-gray-500" : "text-gray-600"
                            }`}
                          >
                            {i18n.t(info.label)}
                          </div>
                          <div
                            className="font-medium"
                            style={{ direction: "ltr" }}
                          >
                            {i18n.t(info.value)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* social link */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-medium mb-6">
                    {i18n.t("My Socials")}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 ">
                    {SOCIAL_LINKS.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 ${
                          isDarkMode
                            ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                            : "bg-white/80 border-gray-200 hover:border-gray-300"
                        } ${social.bgColor} ${social.color}`}
                      >
                        <social.icon size={20} />
                        <span className="font-medium">
                          {i18n.t(social.name)}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* availability status */}
                <motion.div
                  variants={itemVariants}
                  className={`p-6 rounded-xl border ${
                    isDarkMode
                      ? "bg-green-500/10 border-green-500/20"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium text-green-500">
                      {i18n.t("Available for work")}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {/* I'm currently available for freelance projects and full-time oppertunities. */}
                    {i18n.t("Available for work subtitle")}
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* bottom cta */}
            {/* <motion.div
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className='text-center mt-20'
        >
          <motion.div
            variants={itemVariants}
            className={`max-w-2xl mx-auto p-8 rounded-2xl border ${isDarkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50/50 border-gray-200'
              }`}
          >
            <h3 className='text-xl font-medium mb-4'>Prefer a quick call?</h3>
            <p
              className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } mb-6`}
            >
              Sometimes a conversation is worth a thousand messages. Feel free to schedule a call to discuss you project.
            </p>
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-full border font-medium transition-all duration-300 ${isDarkMode ?
                'border-gray-600 hover:border-blue-500 hover:text-blue-400' :
                'border-gray-300 hover:border-blue-500 hover:text-blue-600'
                }`}
            >
              Schedule a call
            </motion.button>
          </motion.div>
        </motion.div> */}
          </div>

          <SuccessModal
            showSuccess={showSuccess}
            setShowSuccess={setShowSuccess}
            isDarkMode={isDarkMode}
          />
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export default ContactSection;
