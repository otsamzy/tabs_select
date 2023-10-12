import "./components/styles.css";
import React, { useEffect, useState } from "react";

import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import LoadingPage from "./components/LoadingPage";
import Btn from "./components/Bnts";
const url = "https://course-api.com/react-tabs-project";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentNumber, setCurrentNumber] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const dataCollect = await response.json();
      setLoading(false);
      setData(dataCollect);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  const { title, dates, duties, id, company } = data[currentNumber];
  return (
    <div className="container">
      {loading && <LoadingPage />}

      <header className="page_title">
        <h1>
          exprience <span className="underline"></span>
        </h1>
      </header>
      <section className="section_center">
        <nav className="nav_container">
          <ul className="nav_list">
            {data.map((item, index) => (
              <li
                key={item.id}
                onClick={() => setCurrentNumber(index)}
                className={`nav ${index === currentNumber && "active"}`}
              >
                {item.company}
              </li>
            ))}
          </ul>
        </nav>

        <section className="main_article">
          <article className="section_header">
            <h3 className="section_title">{title}</h3>
            <p className="company">{company}</p>
            <p className="start_date">{dates}</p>
          </article>

          <ul className="role_desc">
            {duties.map((duty, index) => (
              <li className="List_roles" key={index}>
                <span className="icons">
                  <RiArrowRightDoubleFill />
                </span>
                {duty}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}

export default App;
