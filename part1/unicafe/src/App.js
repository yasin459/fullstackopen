import { useState } from "react";
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value + (props.sign ? ` ${props.sign}` : null)}</td>
    </tr>
  );
};
const Statistics = (props) => {
  const total = props.bad + props.good + props.neutral;
  return total > 0 ? (
    <div>
      <p>statistics</p>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine
            text="average"
            value={(props.good - props.bad) / total}
          />
          <StatisticLine text="positive" value={props.good / total} sign="%" />
        </tbody>
      </table>
    </div>
  ) : (
    <p>no data</p>
  );
};
const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const updateGood = () => {
    setGood(good + 1);
  };
  const updateNeutral = () => {
    setNeutral(neutral + 1);
  };
  const updateBad = () => {
    setBad(bad + 1);
  };
  return (
    <>
      <div>
        <p>give feedback</p>
        <Button text="good" onClick={updateGood} />
        <Button text="neutral" onClick={updateNeutral} />
        <Button text="bad" onClick={updateBad} />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
