import WordList from "./WordList";
import StartUp from "./StartUp";

export default async function Home() {
  return (
    <div>
      <StartUp></StartUp>
      <WordList></WordList>
    </div>
  );
}
