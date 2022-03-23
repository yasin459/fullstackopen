import { useState } from "react";
const Anecdote = (props) => {
  return (
    <>
      <div>{props.anecdote}</div>
      <div>{`has ${props.votes} votes`}</div>
    </>
  );
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const size = anecdotes.length;
  const [selected, setSelected] = useState(0);
  const [mostSelected, setMostSelected] = useState(0);
  const [votes, setVotes] = useState(Array(size).fill(0));
  const updateAnecdote = () => {
    let num = Math.random(size);
    console.log("num: ", num);
    setSelected(Math.floor(Math.random() * size));
  };
  const updateVotes = () => {
    // let t = votes;
    votes[selected] += 1;
    if (votes[selected] > votes[mostSelected]) {
      setMostSelected(selected);
    }
    setVotes([...votes]);
  };
  return (
    <>
      <b>Anecdote of the day</b>
      <br />
      <br />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={updateVotes}>votes</button>
      <button onClick={updateAnecdote}>next anecdote</button>
      <br />
      <br />
      <b>Anecdote with most votes</b>
      <br />
      <br />
      <Anecdote
        anecdote={anecdotes[mostSelected]}
        votes={votes[mostSelected]}
      />
    </>
  );
};

export default App;
