import React, { useState } from 'react';

function TemplatePage() {
  // Define state for storing user data
  const [pageElements, setPageElements] = useState([]);
  const [formFields, setFormFields] = useState([]);

  // Function to add a new element to the page
  const addElement = (elementType) => {
    const newElement = { type: elementType, id: Date.now() };
    setPageElements([...pageElements, newElement]);
  };

  // Function to remove an element from the page
  const removeElement = (elementId) => {
    const updatedElements = pageElements.filter(
      (element) => element.id !== elementId
    );
    setPageElements(updatedElements);
  };

  // Function to add a new form field
  const addFormField = (fieldType) => {
    const newField = { type: fieldType, id: Date.now() };
    setFormFields([...formFields, newField]);
  };

  // Function to remove a form field
  const removeFormField = (fieldId) => {
    const updatedFields = formFields.filter((field) => field.id !== fieldId);
    setFormFields(updatedFields);
  };

  return (
    <div className="template-page">
      <header>
        <h1>Template Page</h1>
      </header>
      <main>
        <div className="page-elements">
          <h2>Add Elements</h2>
          <button onClick={() => addElement('text')}>Text Box</button>
          <button onClick={() => addElement('image')}>Image</button>
          <button onClick={() => addElement('button')}>Button</button>
          {pageElements.map((element) => (
            <div key={element.id}>
              {element.type === 'text' && <input type="text" />}
              {element.type === 'image' && <img src="#" alt="image" />}
              {element.type === 'button' && <button>Click Me</button>}
              <button onClick={() => removeElement(element.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="form-fields">
          <h2>Add Form Fields</h2>
          <button onClick={() => addFormField('text')}>Text Field</button>
          <button onClick={() => addFormField('checkbox')}>Checkbox</button>
          <button onClick={() => addFormField('radio')}>Radio Button</button>
          {formFields.map((field) => (
            <div key={field.id}>
              {field.type === 'text' && <input type="text" />}
              {field.type === 'checkbox' && <input type="checkbox" />}
              {field.type === 'radio' && <input type="radio" />}
              <button onClick={() => removeFormField(field.id)}>Remove</button>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <button>Save</button>
        <button>Edit</button>
      </footer>
    </div>
  );
}

export default TemplatePage;