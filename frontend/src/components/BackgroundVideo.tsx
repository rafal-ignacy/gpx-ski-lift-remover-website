import videoBg from "../assets/background.mp4";

function BackgroundVideo() {
  return (
    <video
      src={videoBg}
      autoPlay
      loop
      muted
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

export default BackgroundVideo;