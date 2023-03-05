const Page = ({ page, currentPage, handleMoveToNextPage }) => {
    const { formElements } = page;
  
    return (
      <div style={{ display: page.id === currentPage ? 'block' : 'none' }}>
        {formElements.map((element) => (
          <div key={element.id}>
            <label>{`Form Element ${element.id}`}</label>
            <input type={element.type} value={element.value} />
          </div>
        ))}
        <button onClick={handleMoveToNextPage}>Next Page</button>
      </div>
    );
  };
export default Page
  