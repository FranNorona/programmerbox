import React, { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./dropdown.css"

const Dropdown = ({ onEdit, onDelete, onSend }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown_container">
      <MoreVertIcon className="dropdown-toggle" onClick={toggleDropdown}></MoreVertIcon>
      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={onEdit}>
            Editar
          </button>
          <button className="dropdown-item" onClick={onDelete}>
            Eliminar
          </button>
          <button className="dropdown-item" onClick={onSend}>
            Ingreso
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
