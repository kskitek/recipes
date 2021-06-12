import { Link } from "react-router-dom";

function MainMenu() {
  return (
      <div className="menu">
        <MenuButton name="Start" to="games"/>
      </div>
  );
}

function MenuButton(props) {
  return (
    <div>
      <Link to={props.to} ><button className="menuButton">{props.name}</button></Link>
    </div>
  )
}

export { MainMenu };
