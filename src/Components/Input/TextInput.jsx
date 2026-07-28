import React from "react";
import { useTranslation } from "react-i18next";

const TextInput = ({
  isDarkMode,
  value,
  handleInputChange,
  textarea,
  label,
  id,
  type = "text",
  error = null,
  onBlur = () => {},
}) => {
  const { i18n } = useTranslation();
  const InputComponent = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      <InputComponent
        type={type}
        id={id}
        name={id}
        className={`w-full px-4 pt-6 pb-2 border rounded-xl transition-all duration-300 outline-none resize-none ${
          isDarkMode
            ? "bg-gray-800/50 border-gray-700 text-white focus:border-blue-500 focus:bg-gray-800/70"
            : "bg-white/80 border-gray-300 text-gray-900 focus:border-blue-500 focus:bg-white"
        } ${
          error
            ? isDarkMode
              ? "border-red-500 focus:border-red-400"
              : "border-red-500 focus:border-red-500"
            : ""
        }`}
        value={value}
        onChange={({ target }) => handleInputChange(target.value)}
        onBlur={onBlur}
        rows={textarea ? 4 : undefined}
      />
      <label
        htmlFor={id}
        className="text-sm absolute left-4 top-2 pointer-events-none origin-left"
      >
        {label}
      </label>
      {error && (
        <p
          className={`text-xs mt-1 ${
            isDarkMode ? "text-red-400" : "text-red-500"
          }`}
        >
          {i18n.t(error)}
        </p>
      )}
    </div>
  );
};

export default TextInput;
