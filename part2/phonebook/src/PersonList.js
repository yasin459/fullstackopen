const PersonItem = (props) => {
  return (
    <div>
      {props.name} {props.number}{" "}
      <button onClick={() => props.onClick(props.id)}>delete</button>
    </div>
  );
};
export const PersonList = (props) => {
  return (
    <div>
      <h2>Numbers</h2>List
      {props.persons.map((e) => (
        <PersonItem name={e.name} number={e.number} id={e.id} key={e.name} onClick={props.onClick} />
      ))}
    </div>
  );
};
