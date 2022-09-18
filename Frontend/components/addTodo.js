// addTodo.js is where new todos are added to our backend.
    function AddTodo({ addTodo }) {
      return (
        <>
          <div className="addTodoContainer">
            <input
              className="todoInputText"
              type="text"
              placeholder="Add new todo here..."
              id="SaleTitle"
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  addTodo(SaleTitle.value);
                  SaleTitle.value = "";
                }
              }}
            />
            <input
              className="todoInputButton"
              type="button"
              value="Add Todo"
              onClick={() => {
                addTodo(SaleTitle.value);
                SaleTitle.value = "";
              }}
            />
          </div>
        </>
      );
    }
    export default AddTodo;