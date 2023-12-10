import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";

Alert.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
};

function Alert({
  content = "",
  type = "error",
  className = "",
  isOpen = false,
}) {
  const [classContent, setClassContent] = useState("");
  const [classNameContainer, setClassNameContainer] = useState("");

  useEffect(() => {
    switch (type) {
      case "error":
        setClassNameContainer("bg-red-200");
        setClassContent("text-red-700");
        break;
      case "success":
        setClassNameContainer("bg-green-200");
        setClassContent("text-green-700");
        break;
      default:
        setClassNameContainer("bg-red-200");
        setClassContent("text-red-700");
        break;
    }
  }, [type]);

  return (
    <>
      {isOpen && (
        <div
          className={`w-1/2 rounded-md p-1.5 ${classNameContainer} ${className}`}
        >
          <p className={`font-semibold text-center ${classContent}`}>
            {content}
          </p>
        </div>
      )}
    </>
  );
}

export default Alert;
