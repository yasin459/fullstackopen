export const FilterControll = (props) => {
  return (
    <>
      <p>Phonebook</p>
      <div>
        filter shown with
        <input
          onChange={(e) => props.filterFunction({ filter: e.target.value })}
        />
      </div>
    </>
  );
};
