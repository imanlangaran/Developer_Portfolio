// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../../context/LangContext";
import { itemVariants } from "../../../utils/helper";

// Author byline above the project title inside the Hero's dark gradient
// footer — shows whose portfolio this is on direct /project/:id visits
// without touching the TopBar. White/blue over the gradient reads in both
// themes (the footer is gray-950/90 in dark and light mode alike).
const BrandByline = () => {
  const { t } = useTranslation("common");
  const { lang } = useLang();
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate("/")}
      aria-label={t("my name")}
      title={t("my name")}
      className="group flex items-center gap-2 mb-3 w-fit"
    >
      <Code2 size={20} className="text-blue-500 shrink-0" />
      <span
        className={`text-base font-medium text-white/90 group-hover:text-white transition-colors ${
          lang === "En" ? "tracking-wide" : ""
        }`}
      >
        {t("my name")}
      </span>
    </motion.button>
  );
};

export default BrandByline;
