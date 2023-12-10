import "./ParamSidebar.css";
import { useSidebar } from "./ParamSidebarContext";
import Icon from "../../Atoms/Icon/Icon";
import Text from "../../Atoms/Text/Text";
import ParamForm from "../ParamForm/ParamForm";

const ParamSidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="param-header">
        <div className="back-content">
          <button onClick={toggleSidebar}>
            <Icon value="ArrowBackIosIcon" borderRadius={20} size={35} />
            <Text text="Retour" type="large" />
          </button>
        </div>
        <div className="centered-text">
          <Text
            text="Paramètres du compte"
            type="title"
            propriety="title__menu"
          />
        </div>
      </div>
      <ParamForm />
    </div>
  );
};

export default ParamSidebar;
