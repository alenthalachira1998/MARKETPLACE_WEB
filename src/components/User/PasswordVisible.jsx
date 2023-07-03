import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordMaskingInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
      >
        {showPassword ? (
          <FontAwesomeIcon icon={faEye} size="lg" color="#999" />
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} size="lg" color="#999" />
        )}
      </button>
    </div>
  );
};

export default PasswordMaskingInput;
