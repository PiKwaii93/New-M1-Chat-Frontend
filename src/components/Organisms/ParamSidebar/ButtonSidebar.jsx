import { useSidebar } from "./ParamSidebarContext";

const ButtonComponent = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      className="param-btn hover:scale-110 mr-8 transition-all ease-out delay-30"
      onClick={toggleSidebar}
    >
      Modifier le profil
    </button>
  );
};

export default ButtonComponent;
