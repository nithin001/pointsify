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
function Index({ organizations, preferred_organization: preferredOrg, class_name: className }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  if(organizations.length === 0) {
    return null;
  }

  return (
    <div>
      <button className={className} onClick={openModal}>Change Organization</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Change organization (currently using {preferredOrg.name})</h2>
        {organizations.map((org) => {
          if (org.id === preferredOrg.id) {
            return null;
          }

          return <a href={`organizations/${org.id}/set_as_preferred`}>{org.name}</a>;
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
