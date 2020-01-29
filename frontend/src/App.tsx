import React from 'react';
import './App.css';
import {List} from "./components/list/List";

const App: React.FC = () => {
  return (
    <>
      <List list={{id: "123", items: [{name: "ogorek", state: "IN_CART"}]}}/>
    </>
  );
};

export default App;
