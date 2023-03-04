export const FormRenderer = ({ formSchema }) => {
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
  
    // Define form validation methods and submit handler
  
    return (
      <div>
        {/* Display registration form UI */}
        <button onClick={handleSubmit}>Subscribe</button>
      </div>
    );
  };
  
  FormRenderer.propTypes = {
    formSchema: PropTypes.object.isRequired,
  };