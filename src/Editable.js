function Input({name, value, onChange, className}) {
  const cn = "editable " + className;
  return (
    <input name={name} type="text" className={cn} value={value} onChange={onChange} placeholder="Recipe name"/>
  );
}

function TextArea({name, value, onChange, className}) {
  const cn = "editable " + className;
  return (
    <textarea name={name} type="text" className={cn} value={value} onChange={onChange} placeholder="Recipe name"/>
  );
}

export { Input, TextArea };
