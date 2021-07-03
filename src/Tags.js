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

  return (
    <div className="tags">
      {tags.map((tag, idx) =>
        <Chip key={idx} tag={tag}
          editMode={editMode} onDelete={onTagDelete(idx)}/>
      )}
    </div>
  )
}

function Chip({tag, editMode, onDelete}) {
  return (
    <div className="tag">
      {tag}
    {editMode && <div className="x" onClick={onDelete}>x</div>}
    </div>
  );
}

export { Tags };
