import Modal from "react-modal";

Modal.setAppElement("#root");

const ImageModal = ({ modalIsOpen, closeModal, customStyles, imageUrl }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      style={customStyles}
    >
      <img src={imageUrl} alt="Large View" />
    </Modal>
  );
};

export default ImageModal;
