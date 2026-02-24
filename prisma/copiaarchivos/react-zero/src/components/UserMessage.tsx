type UserMessageProps = {
  message: string | string[];
};
const UserMessage = ({ message }: UserMessageProps) => {
  return (
    <>
      {Array.isArray(message) ? (
        <ul>
          {message.map((item, id) => (
            <li key={id}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{message}</p>
      )}
    </>
  );
};

export default UserMessage;
