import { useState } from "react";

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

function CommitableInput({name, editMode = false, onCommit, className, children}) {
  const cn = (editMode ? "on" : "off") + " editable "  + className;
  const [value, setValue] = useState("");

  const onChange = ({target}) => {
   setValue(target.value);
  };

  const onEnter = (e) => {
    if (e.which === 13) {
      console.log(value)
      onCommit({target: {value: value}});
      setValue("");
    }
  };

  return (
    <>
    {editMode && <input name={name} type="text" className={cn}
      value={value} onChange={onChange} onKeyPress={onEnter}
      placeholder={name}/>}
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

/* eslint-disable no-unused-vars */
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

function Select({name, value, options, onChange, editMode = false, className, children}) {
  const onChangeIfNotEmpty = ({target}) => {
    if (target.value) {
      onChange({target});
    }
  };

  return (
    <>
    {editMode &&
      <select name={name} className={className} value={value} onChange={onChangeIfNotEmpty}>
        {options.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
      </select>
    }
    {!editMode && children}
    </>
  );
}

export { Input, CommitableInput, TextArea, Select };
