import { useEffect, useState } from "react";
import { FilterControll } from "./FilterComponent";
import { FormControll } from "./FormControll";
import { PersonList } from "./PersonList";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "09155001980" },
    { name: "Arto Hellas2", number: "09155001981" },
  ]);
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const filterFunction = ({ filter }) => {
    if (filter && filter != "") {
      setFilteredPersons(
        persons.filter(
          (person) =>
            person.name.toLowerCase().search(filter.toLowerCase()) > -1
        )
      );
    } else {
      setFilteredPersons(persons);
    }
  };
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);
  const addNewPerson = (e) => {
    e.preventDefault();
    console.log("newPerson: ", newPerson);
    const alreadyExists = persons.some((item) => item.name == newPerson.name);
    if (!alreadyExists) {
      let pp = persons.concat(newPerson);
      setPersons(pp);
      setFilteredPersons(pp);
      setNewPerson((state) => ({ name: "", number: "" }));
    } else {
      alert(`${newPerson.name} already exists`);
    }
  };
  const changeNewPerson = ({ lable, value }) => {
    console.log("changeNewPerson: ", lable, value);
    setNewPerson({
      ...newPerson,
      [lable]: value,
    });
    console.log("newPerson22: ", newPerson);
  };
  return (
    <div>
      <FilterControll filterFunction={filterFunction} />
      <FormControll
        name={newPerson.name}
        number={newPerson.number}
        addNewPerson={addNewPerson}
        changeNewPerson={changeNewPerson}
      />
      <PersonList persons={filteredPersons} />
    </div>
  );
};

export default App;
