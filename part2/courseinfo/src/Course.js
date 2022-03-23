const Header = (props) => {
  return <h1>{props.name}</h1>;
};
const Part = (props) => {
  return (
    <p key={props.id}>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((e) => {
        return <Part name={e.name} exercises={e.exercises} key={e.id} />;
      })}
    </div>
  );
};
const Total = (props) => {
  const total = props.parts.reduce((s, p) => s + p.exercises, 0);
  console.log("total: ", total);
  return <p>Number of exercises {total}</p>;
};
export const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};
