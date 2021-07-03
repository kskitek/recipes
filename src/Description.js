import ReactMarkdown from 'react-markdown';
import { TextArea } from "./Editable";

function Description({description, editMode, onChange}) {
  return (
    <>
      <p className="header">Description:</p>
      <hr/>
      <TextArea name="description" className="description" editMode={editMode}
      value={description} onChange={onChange}>
        <ReactMarkdown className="description">{description}</ReactMarkdown>
      </TextArea>
    </>
  );
}

export { Description };
