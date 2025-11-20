import LightStarsLogo from "/logo.svg";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-background text-text transition-colors relative">
        <div className="bg-primary shadow-md rounded-lg p-10">
          <h1 className="text-3xl font-bold text-center">
            Welcome to <span className="text-secondary">LightStars.io</span>{" "}
            <img
              src={LightStarsLogo}
              className="w-8 h-8 inline-block"
              alt="LightStars logo"
            />
          </h1>
        </div>
        <div className="absolute bottom-6 right-6">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export default App;
