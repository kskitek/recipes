import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/functions";
import getConfig from './config';
import { Input } from "./Editable";

function BackupDB() {
  const [result, setResult] = useState("");
  const [name, setName] = useState("backupName");

  const backup = async (name) => {
    setResult("IN PROGRESS");
    try {
      const result = await startBackup(name);
      setResult("CALLED");
    } catch(error) {
      setResult("FAILED");
    }
  };

  const onChange = ({target}) => {
    setName(target.value);
  };

  return (
    <div className="dbBackup">
      <Input editMode={true} value={name} onChange={onChange}/>
      <button onClick={() => backup(name)}>Backup</button>
      <p>{result}</p>
    </div>
  );
}

async function startBackup(name) {
  return firebase.app()
    .functions("europe-west3")
    .httpsCallable('backupDB')({name: name});
}

export { BackupDB };
