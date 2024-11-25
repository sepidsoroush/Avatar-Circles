import AvatarCircles from "./components/avatar-circles";

const avatars = [
  {
    imageUrl: "Emma.png",
    name: "Emma",
    position: "Product designer",
  },
  {
    imageUrl: "Mike.png",
    name: "Mike",
    position: "Sr. Backend developer",
  },
  {
    imageUrl: "Gina.png",
    name: "Gina",
    position: "Frontend developer",
  },
  {
    imageUrl: "Tony.png",
    name: "Tony",
    position: "Product manager",
  },
];

function App() {
  return (
    <div className="w-screen flex justify-center items-center">
      <AvatarCircles avatarUrls={avatars} />
    </div>
  );
}

export default App;
