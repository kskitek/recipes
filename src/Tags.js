import { CommitableInput } from "./Editable";

function Tags({tags, editMode, onChange}) {
  const onTagDelete = (idx) => (e) => {
    tags.splice(idx,1);
    onChange({
      target: {
        name: "tags",
        value: tags
      }
    });
  };

  const onClick = ({target}) => {
    console.log("trying to search by tag", target.value);
  };

  const onTagAdd = ({target}) => {

    tags.push(target.value);
    onChange({
      target: {
        name: "tags",
        value: tags
      }
    });
  };

  return (
    <div className="tags">
      {tags.map((tag, idx) =>
        <Chip key={idx} tag={tag}
          editMode={editMode} onClick={onClick} onDelete={onTagDelete(idx)}/>
      )}
      <CommitableInput name="tag" placeholder="tag"
        editMode={editMode} onCommit={onTagAdd}/>
    </div>
  )
}

function Chip({tag, editMode, onClick = () => {}, onDelete = () => {}}) {
  const onChipClick = () => {
    onClick({target: {value: tag}});
  };

  return (
    <div className="tag">
      <div onClick={onChipClick}>{tag}</div>
      {editMode && <div className="x" onClick={onDelete}>✘</div>}
    </div>
  );
}

export { Tags };
