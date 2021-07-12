import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faThermometerHalf, faClock } from '@fortawesome/free-solid-svg-icons'
import { Input, Select } from "./Editable";

function Ingridients({sections, editMode, onChange}) {
  const onDelete = (idx) => {
    sections.splice(idx,1);
    onChange({
      target: {
        name: "ingridientSections",
        value: sections
      }
    });
  };

  const onSectionChange = (idx) => ({target}) => {
    sections[idx][target.name] = target.value;
    onChange({
      target: {
        name: "ingridientSections",
        value: sections
      }
    });
  };

  const addNewSection = () => {
    sections.push({name: "", ingridients: []});
    onChange({
      target: {
        name: "ingridientSections",
        value: sections
      }
    });
  };

  return (
    <div>
      <p className="header">Ingridients:</p>
      <hr/>
      <div className="ingridientsSections">
        {sections.map((section, idx) =>
          <IngridientsSection key={idx} section={section}
           editMode={editMode} onChange={onSectionChange(idx)}
           onDelete={() => onDelete(idx)}
          />
        )}
      {editMode && <div className="ingridientsSectionPlaceholder">
        <div className="button dimmed ingridient"
        onClick={addNewSection}>+</div>
       </div>
      }
      </div>
    </div>
  )
}

function IngridientsSection({section, editMode, onChange, onDelete}) {
  const onIngridientChange = (idx) => ({target}) => {
    section.ingridients[idx][target.name] = target.value;
    onChange({
      target: {
        name: "ingridients",
        value: section.ingridients
      }
    });
  };

  const addNewIngridient = () => {
    section.ingridients.push({name: "", quantity: "", unit: ""});
    onChange({target: {
      name: "ingridients",
      value: section.ingridients
    }});
  };

  const onIngridientDelete = (idx) => {
    section.ingridients.splice(idx,1);
    onChange({
      target: {
        name: "ingridients",
        value: section.ingridients
      }
    });
  };

  return (
    <div className="ingridientsSection">
      {!editMode &&
        <div className="sectionTitle">
          <div>{section.name}</div>
          <div>{section.temperature && (
            <>
            <FontAwesomeIcon icon={faThermometerHalf}/> {section.temperature}°C
            </>
          )}</div>
          <div>{section.time && (
            <>
            <FontAwesomeIcon icon={faClock}/> {section.time}″
            </>
          )}</div>
        </div>
      }
      {editMode && (
        <>
        <div className="sectionTitle" >
          <Input name="name" editMode={editMode}
            value={section.name} onChange={onChange}/>
          <div id="TODO this is a hack :("/>
          <div className="button dimmed" onClick={onDelete}><FontAwesomeIcon icon={faTrashAlt}/></div>
        </div>
        <TempAndTime section={section} editMode={editMode} onChange={onChange}/>
        </>
      )}
      <ul className="ingridientsList">
        {section.ingridients.map((i, idx) =>
        <Ingridient key={idx} ingridient={i}
          editMode={editMode} onChange={onIngridientChange(idx)}
          onDelete={() => onIngridientDelete(idx)}
        />
      )}
      {editMode && <div className="button dimmed ingridient"
        onClick={() => addNewIngridient()}>
        +
        </div>
      }
      </ul>
    </div>
  );
}

function Ingridient({ingridient, editMode, onChange, onDelete}) {
  const cn = "ingridient " + (editMode ? "on": "off");
  const units = [
    "",
    "g", "dag", "kg",
    "ml", "litr",
    "szt",
    "tbsp(Ł)", "tsp",
    "szklanka", "szczypta",
    "do smaku"
  ];

  return (
    <li className={cn}>
      <Input name="quantity" editMode={editMode}
        value={ingridient.quantity} onChange={onChange}>
        <div>{ingridient.quantity}</div>
      </Input>
      <Select name="unit" value={ingridient.unit} options={units}
        onChange={onChange} editMode={editMode}>
        <div>{ingridient.unit}</div>
      </Select>
      <Input name="name" editMode={editMode}
        value={ingridient.name} onChange={onChange}>
        <div>{ingridient.name}</div>
      </Input>
      {editMode &&
        <div className="button dimmed" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashAlt}/>
        </div>
      }
    </li>
  );
}

function TempAndTime({section, editMode, onChange}) {
  const showTemp = editMode || section.temperature;
  const showTime = editMode || section.time;

  return (
    <div className="tempAndTime">
      {showTemp && <div>Temperature:</div>}
      <Input name="temperature" editMode={editMode}
        value={section.temperature} onChange={onChange}>
        {showTemp && <div>{section.temperature}°C</div>}
      </Input>
      {showTime && <div>Time:</div>}
      <Input name="time" editMode={editMode}
        value={section.time} onChange={onChange}>
        {showTime && <div>{section.time}″</div>}
      </Input>
    </div>
  )
}


export { Ingridients };
