function Input({name, value, editMode = false, onChange, className, children}) {
  const cn = (editMode ? "on" : "off") + " editable "  + className;
  return (
    <>
    {editMode && <input name={name} type="text" className={cn}
      value={value} onChange={onChange} placeholder={name}/>}
    {!editMode && children}
    </>
  );
}

function TextArea({name, value, editMode = false, onChange, className, children}) {
  const cn = (editMode ? "on" : "off") + " editable "  + className;
  return (
    <>
    {editMode && <textarea name={name} type="text" className={cn}
      value={value} onChange={onChange} placeholder={name}/>}
    {!editMode && children}
    </>
  );
}

function List({name, value, editMode = false, onChange, className, children,
  newElementFactory = () => {}}) {
  const cn = (editMode ? "on" : "off") + " editable "  + className;
  return (
    <>
    {children}
    <button/>
    </>
  );
}

export { Input, TextArea };
