import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-regular-svg-icons'

function useEditButton(onSave, startInEdit = false) {
  const [ editMode, setEditMode ] = useState(startInEdit);
  const [ edited, setEdited ] = useState(false);

  const toggleEditMode = async () => {
    if (editMode) {
      setEdited(false);
      onSave();
    }
    setEditMode(!editMode);
  };

  // TODO add discard changes option
  const EditButton = () =>
    <div className="button" onClick={toggleEditMode} disabled={editMode && !edited}>
      {editMode ? <FontAwesomeIcon icon={faSave}/> : <FontAwesomeIcon icon={faEdit}/>}
      </div>

  return { EditButton, editMode, edited, setEdited };
}

export { useEditButton };
