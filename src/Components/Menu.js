import React, { useState } from "react";
import { menuOptions, formatValue } from "../config/menuOptions";
import { handler } from "../config/temp.js";

function Menu() {
  const { formValues, setFormValues } = useState({
    gradeLevel: "1",
    subjectArea: "Math",
    unit: "",
    numLearningObjectives: 2,
  });

  return (
    <div>
      <form onSubmit={handler()}>
        <label htmlFor="grade-level">Choose a Grade Level:</label>
        <select name="grade-level" id="grade-level">
          {menuOptions["gradeLevel"].map((level, idx) => (
            <option value={level} key={idx}>
              {level}
            </option>
          ))}
        </select>
        <label htmlFor="subject-area">Choose a Subject Area:</label>
        <select name="subject-area" id="subject-area">
          {menuOptions["subjectArea"].map((subject, idx) => (
            <option value={formatValue(subject)} key={idx}>
              {subject}
            </option>
          ))}
        </select>
        <label htmlFor="learning-objectives">Learning Objectives:</label>
        <select name="learning-objectives" id="learning-objectives">
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
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Menu;
