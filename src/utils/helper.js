export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

export const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    }
  }
}

export const getLangFromLocalStorageOrDefault = () => localStorage.getItem('lang') || "Fa";

export const setLangToLocalStorage = (lang) => lang && localStorage.setItem('lang', lang);

export const getChangeLangDuration = (unit) => (unit === 'ms' ? 1000 : 1) * 0.4;

export const scrollToSection = (sectionId, onSuccess, timeout = 0) => {
  const element = document.getElementById(String(sectionId).toLowerCase());
  if (element) {
    setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth" });
      if(typeof onSuccess === 'function'){
        onSuccess();
      }
    }, timeout);
  }
};