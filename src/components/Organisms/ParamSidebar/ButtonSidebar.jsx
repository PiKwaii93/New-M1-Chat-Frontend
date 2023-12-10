import { useSidebar } from "./ParamSidebarContext";

const ButtonComponent = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button className="param-btn" onClick={toggleSidebar}>
      Modifier le profil
    </button>
  );
};

export default ButtonComponent;
