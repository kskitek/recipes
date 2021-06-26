import { useState } from "react";

function useEditButton(onSave) {
  const [ editMode, setEditMode ] = useState(false);
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
    <div className="button" onClick={toggleEditMode} disabled={editMode && !edited}>{editMode ? "Save" : "Edit"}</div>

  return { EditButton, editMode, edited, setEdited };
}

export { useEditButton };
