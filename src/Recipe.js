import { useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { useGetRecipe, saveRecipe } from "./recipiesDao";
import { Input, TextArea, Select } from "./Editable";
import { LoginContext } from "./Login";
import { useEditButton } from "./EditButton";

function Recipe({isNew}) {
  const { recipeId } = useParams();
  const [ recipe, setRecipe, error ] = useGetRecipe(recipeId);

  useEffect(() => {
    if (recipe) {
      document.title = recipe.name;
    } else {
      document.title = "Recipe not found";
    }
  }, [recipe]);

  return (
    <div>
      {error && error}
      {recipe && <Details recipe={recipe} setRecipe={setRecipe}/>}
    </div>
  )
}
// TODO add spinner on load

function Details({recipe, setRecipe}) {
  const { user } = useContext(LoginContext);
  const history = useHistory();

  const onSave = async () => {
    const [newId, error] = await saveRecipe(recipe);
    if (newId) {
      history.replace(`/recipes/${newId}`);
    }
  };
  const { EditButton, editMode, setEdited } = useEditButton(onSave);

  const onChange = ({target}) => {
    setRecipe({
      ...recipe,
      author: user,
      [target.name]: target.value,
    });
    setEdited(true);
  };

  return (
    <div className="details">
      <div className="titleRow">
        <HomeLink/>
          <Input name="name" className="title" editMode={editMode}
           value={recipe.name} onChange={onChange}>
            <div>{recipe.name}</div>
          </Input>
        <EditButton/>
      </div>

      <div>
      <Input name="url" className="url" editMode={editMode}
        value={recipe.url} onChange={onChange}>
        <a href={recipe.url}>{recipe.url}</a>
      </Input>
      </div>

      <TempAndTime recipe={recipe} editMode={editMode} onChange={onChange}/>
      <Ingridients sections={recipe.ingridientSections} editMode={editMode} onChange={onChange}/>
      <Description description={recipe.description} editMode={editMode} onChange={onChange}/>
      <Notes notes={recipe.notes} editMode={editMode} onChange={onChange}/>
    </div>
  );
}

function TempAndTime({recipe, editMode, onChange}) {
  return (
    <div className="tempAndTime">
      <div>Temperature:</div>
      <Input name="temperature" editMode={editMode}
        value={recipe.temperature} onChange={onChange}>
          <div>{recipe.temperature}°C</div>
      </Input>
      <div>Time:</div>
      <Input name="time" editMode={editMode}
        value={recipe.time} onChange={onChange}>
          <div>{recipe.time}″</div>
      </Input>
    </div>
  )
}

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


  // editMode={editMode} onChange={onIngridientChange(idx)}
  //onDelete={() => onDelete(idx)}

  return (
    <div className="ingridientsSection" key={section.name}>
      {!editMode && <div className="sectionTitle">{section.name}</div>}
      {editMode && (
        <div className="sectionTitle">
          <Input name="name" className="" editMode={editMode}
            value={section.name} onChange={onChange}/>
          <div className="button dimmed" onClick={onDelete}><FontAwesomeIcon icon={faTrashAlt}/></div>
        </div>
      )}
      <ul className="ingridientsList">
        {section.ingridients.map((i, idx) =>
        <Ingridient key={idx} ingridient={i} idx={idx}
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

function Ingridient({ingridient, idx, editMode, onChange, onDelete}) {
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
    <li className={cn} key={idx}>
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

function Description({description, editMode, onChange}) {
  return (
    <>
      <p className="header">Description:</p>
      <hr/>
      <div className="description">
        <TextArea name="description" className="description" editMode={editMode}
        value={description} onChange={onChange}>
          <ReactMarkdown>{description}</ReactMarkdown>
        </TextArea>
      </div>
    </>
  );
}

function Notes({notes, editMode, onChange}) {
  return (
    <div className="notesList">
      <p className="header">Notes:</p>
      <hr/>
      <ul>{notes.map((n, idx) => <li className="note" key={idx}>{n}</li>)}</ul>
    </div>
  )
}

function HomeLink() {
  return (
    <Link to="/" >📖</Link>
  );
}

export { Recipe };
