import BackgroundVideo from "../assets/background.mp4";
import StravaAuthButton from "../components/home/StravaLoginButton";
import UploadGpxButton from "../components/home/UploadGpxButton";
import "../styles/Home.css";

function Home() {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <BackgroundVideo />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <div className="custom-background rounded-xl p-12 bg">
          <h1 className="text-4xl text-white font-bold text-center">
            Ski lift remover
          </h1>
          <h2 className="text-xl text-white text-center opacity-90">
            Let us remove ski lifts from your activities
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <StravaAuthButton />
            <UploadGpxButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
