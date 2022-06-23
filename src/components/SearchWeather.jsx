import React, { useEffect, useState } from "react";
import weatherApi from "../api";
import ClipLoader from "react-spinners/ClipLoader";

const SearchWeather = () => {
  const [search, setSearch] = useState("Lucknow");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      setResponse([]);
      setLoading(true);
      try {
        setData([]);
        const response = await weatherApi.get(
          `weather?q=${search}&appid=0ab0bf78b51e8eb6df55594ee6c81d51`
        );
        setResponse(response);
        setData(response.data);
        setInput("");
        setLoading(false);
        console.log(data);
        console.log(loading);
        console.log(response);
      } catch (error) {
        setResponse(error.response);
        setInput("");
      }
    };
    fetchWeather();
  }, [search]);

  const KelvinToCelcius = (temp) => (temp - 273.15).toFixed(2);

  let emoji = null;

  const getEmoji = (weather) => {
    if (weather === "Clouds") {
      emoji = "fa-cloud";
    } else if (weather === "ThunderStorm") {
      emoji = "fa-bolt";
    } else if (weather === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (weather === "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (weather === "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
    return emoji;
  };

  //   Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  // Time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
  };

  return (
    <div>
      <div className="container pt-5">
        {response.status !== 404 && data.length === 0 ? (
          <div
            style={{ display: "grid", placeContent: "center", height: "100vh" }}
          >
            <ClipLoader color="gray" size={150} />
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card text-white text-center border-0">
                <img
                  src={
                    response.status === 404
                      ? "data:image/png;base64,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"
                      : `https://source.unsplash.com/600x900/?${data?.weather[0]?.main}`
                  }
                  className="card-img"
                  alt=""
                />
                <div className="card-img-overlay">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-4 w-75 mx-auto">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search City"
                        aria-label="Search City"
                        aria-describedby="basic-addon2"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="input-group-text"
                        id="basic-addon2"
                      >
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </form>
                  {loading === true ? (
                    <div>No match found</div>
                  ) : (
                    <div className="bg-dark bg-opacity-50 py-3">
                      <h2 className="card-title">{data.name}</h2>
                      <p className="card-text">
                        {day}, {month} {date}, {year}
                        <br />
                        {time}
                      </p>
                      <hr />
                      <i
                        className={`fas ${getEmoji(
                          data?.weather[0]?.main
                        )} fa-4x`}
                      ></i>
                      <h1 className="fw-bolder mb-5">
                        {KelvinToCelcius(data?.main?.temp)} &deg;C
                      </h1>
                      <p className="lead fw-bolder mb-0">
                        {data?.weather[0]?.main}
                      </p>
                      <p className="lead">
                        {KelvinToCelcius(data?.main?.temp_min)} &deg;C |{" "}
                        {KelvinToCelcius(data?.main?.temp_max)} &deg;C
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchWeather;
