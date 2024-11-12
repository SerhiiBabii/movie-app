import React from "react";
import { Modal, ModalBody } from "reactstrap";
import PropTypes from "prop-types";
import ModalLogin from "./ModalLogin";
import AppContextHOC from "../../HOC/AppContextHOC";

const Login = props => {
  return (
    <div>
      <button
        className="btn btn-success"
        type="button"
        onClick={props.toggleModal}
      >
        Log In
      </button>
      <Modal isOpen={props.showModal} toggle={props.toggleModal}>
        <ModalBody>
          <ModalLogin />
        </ModalBody>
      </Modal>
    </div>
  );
};

Login.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default AppContextHOC(Login);
