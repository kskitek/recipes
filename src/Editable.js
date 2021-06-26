function Input({name, value, onChange, className}) {
  const cn = "editable " + className;
  return (
    <input name={name} type="text" className={cn} value={value} onChange={onChange} placeholder="Recipe name"/>
  );
}

function Input2({name, value, editMode = false, onChange, className, children}) {
  const cn = (editMode ? "on" : "off") + " editable "  + className;
  return (
    <>
    {editMode && <input name={name} type="text" className={cn}
      value={value} onChange={onChange} placeholder={name}/>}
    {!editMode && children}
    </>
  );
}

function TextArea({name, value, onChange, className}) {
  const cn = "editable " + className;
  return (
    <textarea name={name} type="text" className={cn} value={value} onChange={onChange} placeholder="Recipe name"/>
  );
}

export { Input, Input2, TextArea };
