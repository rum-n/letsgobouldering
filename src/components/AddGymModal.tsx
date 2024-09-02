import React, { useState } from 'react';
import styled from 'styled-components';
import AddGymForm from './AddGymForm';

const ModalOverlay = styled.div`
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  z-index: 1001;
  background-color: #b5b8a3;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const AddGymModal = ({ showModal, closeModal }: ModalProps) => {

  if (!showModal) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <AddGymForm />
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddGymModal;
