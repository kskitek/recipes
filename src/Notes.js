import ReactMarkdown from 'react-markdown';
import { Input } from "./Editable";

function Notes({notes, editMode, onChange}) {
  const onNoteChange = (idx) => ({target}) => {
    notes[idx] = target.value;
    onChange({
      target: {
        name: "notes",
        value: notes
      }
    });
  };
  const addNewNote = () => {
    notes.push("");
    onChange({
      target: {
        name: "notes",
        value: notes
      }
    });
  };

  return (
    <div className="notesList">
      <p className="header">Notes:</p>
      <hr/>
      <ul>
        {notes.map((n, idx) =>
          <Note key={idx} note={n} editMode={editMode} onChange={onNoteChange(idx)}/>
        )}
        {editMode && <div className="button dimmed note"
          onClick={() => addNewNote()}>
          +
          </div>
        }
    </ul>
    </div>
  )
}

function Note({note, editMode, onChange}) {
  return (
    <li className="note">
      <Input name="note" className="note" editMode={editMode}
      value={note} onChange={onChange}>
        <ReactMarkdown className="note">{note}</ReactMarkdown>
      </Input>
    </li>
  );
}

export { Notes };
