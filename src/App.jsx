import React, { useState, useEffect } from "react";
import "./index.css";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
recognition = new SpeechRecognition();

const App = () => {
  const [listening, setListening] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toggleListening = () => {
    if (!listening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  };

  useEffect(() => {
    recognition.addEventListener("result", handleSpeech);
    recognition.addEventListener("start", () => setListening(true));
    recognition.addEventListener("end", () => setListening(false));
    return () => {
      recognition.removeEventListener("result", handleSpeech);
      recognition.removeEventListener("start", () => setListening(true));
      recognition.removeEventListener("end", () => setListening(false));
    };
  }, []);

  const handleSpeech = (event) => {
    const transcript = event.results[0][0].transcript;
    addTodoWithId(transcript);
  };

  const addTodoWithId = (title) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    if (inputValue.trim() !== "") {
      addTodoWithId(inputValue);
      setInputValue("");
    }
  };
  const speakTodo = (title) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(title);
    synth.speak(utterance);
  };
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  return (
    <div className="wrap">
      <div className="conatiner">
        <div className="form">
          <input
            type="text"
            placeholder="Yozing"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="btn-gr">
            <button className="btn" onClick={toggleListening}>
              {listening ? (
                <span className="show">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="26"
                    height="26"
                    fill="red"
                  >
                    <path d="M11.9998 1C14.7612 1 16.9998 3.23858 16.9998 6V10C16.9998 12.7614 14.7612 15 11.9998 15C9.23833 15 6.99976 12.7614 6.99976 10V6C6.99976 3.23858 9.23833 1 11.9998 1ZM3.05469 11H5.07065C5.55588 14.3923 8.47329 17 11.9998 17C15.5262 17 18.4436 14.3923 18.9289 11H20.9448C20.4837 15.1716 17.1714 18.4839 12.9998 18.9451V23H10.9998V18.9451C6.82814 18.4839 3.51584 15.1716 3.05469 11Z"></path>
                  </svg>
                </span>
              ) : (
                <span className="tinglash">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="26"
                    height="26"
                    fill="black"
                  >
                    <path d="M11.9998 1C14.7612 1 16.9998 3.23858 16.9998 6V10C16.9998 12.7614 14.7612 15 11.9998 15C9.23833 15 6.99976 12.7614 6.99976 10V6C6.99976 3.23858 9.23833 1 11.9998 1ZM3.05469 11H5.07065C5.55588 14.3923 8.47329 17 11.9998 17C15.5262 17 18.4436 14.3923 18.9289 11H20.9448C20.4837 15.1716 17.1714 18.4839 12.9998 18.9451V23H10.9998V18.9451C6.82814 18.4839 3.51584 15.1716 3.05469 11Z"></path>
                  </svg>
                </span>
              )}
            </button>
            <button className="btn save" onClick={handleSave}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="currentColor"
              >
                <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM13 12V8H11V12H8L12 16L16 12H13Z"></path>
              </svg>
            </button>
          </div>
        </div>

        <ol>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}{" "}
              <button
                className="btn speak"
                onClick={() => speakTodo(todo.title)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="rgba(70,146,221,1)"
                >
                  <path d="M9 2C13.0675 2 16.426 5.03562 16.9337 8.96494L19.1842 12.5037C19.3324 12.7367 19.3025 13.0847 18.9593 13.2317L17 14.071V17C17 18.1046 16.1046 19 15 19H13.001L13 22H4L4.00025 18.3061C4.00033 17.1252 3.56351 16.0087 2.7555 15.0011 1.65707 13.6313 1 11.8924 1 10 1 5.58172 4.58172 2 9 2ZM21.1535 18.1024 19.4893 16.9929C20.4436 15.5642 21 13.8471 21 12.0001 21 10.153 20.4436 8.4359 19.4893 7.00722L21.1535 5.89771C22.32 7.64386 23 9.74254 23 12.0001 23 14.2576 22.32 16.3562 21.1535 18.1024Z"></path>
                </svg>
              </button>
              <button className="btn delete" onClick={() => deleteTodo(todo.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path>
                </svg>
              </button>
              
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default App;
