import './App.css';
import firebase from 'firebase/app';
import getConfig from './config';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RecipiesList } from './RecipesList';
import { Recipe } from './Recipe';
import { WithLogin } from './Login';
import { BackupDB } from './Backup';

function App() {
  // TODO cealn up firebase init stuff..
  if (firebase.apps.length === 0) {
    firebase.initializeApp(getConfig().firebase);
    /* firebase.analytics(); */
  }

  return (
    <>
      <nav className="app">
        <BrowserRouter>
          <WithLogin>
            <Switch>
              <Route exact path="/"><RecipiesList/></Route>
              <Route exact path="/recipes/new"><Recipe isNew/></Route>
              <Route exact path="/recipes/:recipeId"><Recipe/></Route>
              <Route exact path="/backup"><BackupDB/></Route>
            </Switch>
          </WithLogin>
        </BrowserRouter>
      </nav>
    </>
  );
}

export default App;
