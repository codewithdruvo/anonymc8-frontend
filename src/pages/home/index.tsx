import CreateButton from "./sections/create-button";
import JoinButton from "./sections/join-button";

type Props = {};

const HomePage = (_props: Props) => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col max-w-screen-sm">
        <h1 className="text-3xl font-bold mb-2">AnoNymC8</h1>
        <p className="text-base opacity-80 mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          quibusdam architecto dolores magni blanditiis aliquid veritatis quod
          quas deserunt consequuntur.
        </p>
        <div className="flex items-start sm:items-center gap-2 max-w-md flex-col sm:flex-row">
          <CreateButton />
          <JoinButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
