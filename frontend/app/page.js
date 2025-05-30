import LikeButton from "./like-button";

function Header({ title }) {
  return <h1>{title}</h1>;
}
export default function App() {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];
  return (
    <div>
      <Header title="A different way to do it" />
      <p>This is a paragraph</p>
      <Header title="Names" />
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <LikeButton />
    </div>
  );
}
