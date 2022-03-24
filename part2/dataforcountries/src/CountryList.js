export const CountryList = ({ list, onClick }) => {
  return (
    <>
      {list.length > 0 ? (
        list.map((item) => (
          <ListItem item={item.name.common} data={item} onClick={onClick} />
        ))
      ) : (
        <p>fetching data</p>
      )}
    </>
  );
};
const ListItem = ({ item, onClick, data }) => {
  return (
    <p>
      {item} <button onClick={() => onClick(data)}>show</button>{" "}
    </p>
  );
};
