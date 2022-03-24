import { useEffect, useState } from "react";
import { FilterControll } from "./FilterComponent";
import { FormControll } from "./FormControll";
import { PersonList } from "./PersonList";
import { getAll, create, update, deletePhone } from "./webService";

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
    getAll()
      .then((personsRes) => {
        console.log("response getall: ", personsRes);
        setPersons(personsRes);
        setFilteredPersons(personsRes);
      })
      .catch((e) => {
        alert(`error while fetching allData: ${e}`);
      });
  }, []);
  const addNewPerson = (e) => {
    e.preventDefault();
    console.log("newPerson: ", newPerson);
    const alreadyExists = persons.findIndex(
      (item) => item.name == newPerson.name
    );
    console.log("already exists: ", alreadyExists);
    if (alreadyExists === -1) {
      create(newPerson).then((response) => {
        let pp = persons.concat(response);
        setPersons(pp);
        setFilteredPersons(pp);
        setNewPerson((state) => ({ name: "", number: "" }));
      });
    } else if (
      window.confirm(
        `${newPerson.name} already exists, do you want to change his number?`
      )
    ) {
      update(persons[alreadyExists].id, newPerson).then((response) => {
        persons[alreadyExists] = response;
        let pp = [...persons];
        setPersons(pp);
        setFilteredPersons(pp);
        setNewPerson((state) => ({ name: "", number: "" }));
      });
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
  const onDelete = (id) => {
    deletePhone(id)
      .then((res) => {
        console.log("deletePhone: ", res);
        let pp = persons.filter((e) => e.id !== id);
        setPersons(pp);
        setFilteredPersons(pp);
      })
      .catch((e) => {
        alert(`cannot delete id: ${id}`);
      });
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
      <PersonList persons={filteredPersons} onClick={onDelete} />
    </div>
  );
};

export default App;
