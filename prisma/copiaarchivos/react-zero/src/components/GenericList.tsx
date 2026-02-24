type GenericListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};
const GenericList = <T,>({ items, renderItem }: GenericListProps<T>) => {
  return (
    <>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{renderItem(item)}</li>
        ))}
      </ul>
    </>
  );
};

export default GenericList;
