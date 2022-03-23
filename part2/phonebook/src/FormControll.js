export const FormControll = (props) => {
  const changeName = (e) => {
    props.changeNewPerson({ lable: "name", value: e.target.value });
  };
  const changeNumber = (e) => {
    props.changeNewPerson({ lable: "number", value: e.target.value });
  };
  return (
    <form onSubmit={props.addNewPerson}>
      <p>add a new</p>
      <div>
        name: <input value={props.name} onChange={changeName} name="name" />
      </div>

      <div>
        number:{" "}
        <input value={props.number} name="number" onChange={changeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
