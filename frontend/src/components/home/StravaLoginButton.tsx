function StravaAuthButton() {
  const handleStravaAuth = () => {
    const clientId = "151992";
    const redirectUri = encodeURIComponent("http://localhost:8000/auth/strava/callback");
    const scope = "activity:read_all";

    const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = stravaAuthUrl;
  };

  return (
    <button className="strava-button mt-4 bg-zinc-700 text-white px-4 py-2 rounded-lg mr-4 hover:cursor-pointer"
      onClick={handleStravaAuth}>
      <span className="block font-semibold">Login to Strava</span>
      <span className="block text-xs mt-1 text-gray-300">select file from your activity</span>
    </button>
  );
};

export default StravaAuthButton;
