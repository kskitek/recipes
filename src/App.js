import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RecipiesList } from './RecipesList';
import { Recipe } from './Recipe';

function App() {
  return (
    <>
      <nav className="app">
        <BrowserRouter>
          <Switch>
              <Route exact path="/"><RecipiesList/></Route>
            <Route exact path="/recipes/:recipeId"><Recipe/></Route>
          </Switch>
        </BrowserRouter>
      </nav>
    </>
  );
}

export default App;
