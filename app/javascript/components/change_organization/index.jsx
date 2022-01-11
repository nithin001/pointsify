import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// eslint-disable-next-line max-len,react/prop-types
function Index({ stores, preferred_store: preferredOrg, class_name: className }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  if(stores.length === 0) {
    return null;
  }

  return (
    <div>
      <button className={className} onClick={openModal}>Change Store</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Change store (currently using {preferredOrg.name})</h2>
        {stores.map((store) => {
          if (store.id === preferredOrg.id) {
            return null;
          }

          return <a href={`stores/${store.id}/set_as_preferred`}>{store.name}</a>;
        })}
        <br/><br/>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}

Index.propTypes = {

};

export default Index;
