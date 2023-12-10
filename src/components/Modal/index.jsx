import PropTypes from "prop-types";
import Button from "../Button";

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

export default function Modal({
  isOpen = false,
  onDelete = () => {},
  onCancel = () => {},
}) {
  return (
    <>
      {isOpen && (
        <div className="absolute z-10 top-0 left-0 bg-black/[.6] w-full h-full flex items-center justify-center">
          <div className="bg-white w-[50%] p-8 rounded-xl ">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-red-600 mb-4">
                Suppresion de compte
              </h3>
              <p>Vous êtes sur le point de suppremier votre compte !</p>
              <p>Tout supression est définitive 😱</p>
            </div>

            <div className="flex justify-center gap-8">
              <Button
                onClick={() => onDelete()}
                label="Supprimer"
                className="w-full bg-red-600 focus-visible:outline-red-600 outline outline-red-600 hover:bg-red-800 hover:outline-red-800 border-none "
              />
              <Button
                onClick={() => onCancel()}
                label="Annuler"
                className="w-full bg-white hover:bg-white text-black border-none outline outline-red-600 focus-visible:outline-red-600 hover:outline-red-800"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
