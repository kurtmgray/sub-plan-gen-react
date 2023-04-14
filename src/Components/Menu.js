import React, { useState, useEffect } from "react";
import { menuOptions, formatValue } from "../config/menuOptions";
import { handler } from "../config/temp.js";

function Menu() {
  const [formValues, setFormValues] = useState({
    gradeLevel: "",
    subjectArea: "",
    unit: "",
    numLearningObjectives: "",
  });
  const [response, setResponse] = useState({});

  useEffect(() => {
    response != {} && console.log(response);
  }, [response, setResponse]);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const data = await handler(formValues);
          setResponse(data);
        }}
      >
        <label htmlFor="gradeLevel">Choose a Grade Level:</label>
        <select
          name="gradeLevel"
          id="gradeLevel"
          value={formValues.gradeLevel}
          onChange={(e) => {
            setFormValues({ ...formValues, [e.target.name]: e.target.value });
          }}
        >
          {menuOptions["gradeLevel"].map((level, idx) => (
            <option value={level} key={idx}>
              {level}
            </option>
          ))}
        </select>
        <label htmlFor="subjectArea">Choose a Subject Area:</label>
        <select
          name="subjectArea"
          id="subjectArea"
          value={formValues.subjectArea}
          onChange={(e) => {
            setFormValues({ ...formValues, [e.target.name]: e.target.value });
          }}
        >
          {menuOptions["subjectArea"].map((subject, idx) => (
            <option value={formatValue(subject)} key={idx}>
              {subject}
            </option>
          ))}
        </select>
        <label htmlFor="numLearningObjectives">Learning Objectives:</label>
        <select
          name="numLearningObjectives"
          id="numLearningObjectives"
          value={formValues.numLearningObjectives}
          onChange={(e) => {
            setFormValues({ ...formValues, [e.target.name]: e.target.value });
          }}
        >
          {Array(menuOptions["learningObjectivesMax"])
            .fill("")
            .map((_max, idx) => (
              <option value={idx + 1} key={idx}>
                {idx + 1}
              </option>
            ))}
        </select>
        <label htmlFor="unit">Unit:</label>
        <input
          type="text"
          name="unit"
          id="unit"
          placeholder="type unit here"
          value={formValues.unit}
          onChange={(e) => {
            setFormValues({ ...formValues, [e.target.name]: e.target.value });
          }}
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
      {response.body && <p>{response.body}</p>}
    </div>
  );
}

export default Menu;
