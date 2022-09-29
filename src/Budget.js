import React, { useState } from "react";
import "./Budget.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Circle from "../src/Assets/Images/Circle.svg";

const Budget = () => {
  const [ bal, setBal] =useState();
  const [budget, setBudget] = useState(bal);
  const [detailes, setDetailes] = useState([
    {
      item: "",
      cost: "",
    },
  ]);
  const [price, setPrice] = useState(true);
  const [data, setData] = useState([]);
  const [spent, setSpent] = useState(0);
  const [editBudget, setEditBudget] = useState(budget);
  const changeHandler = (e) => {
    setDetailes({ ...detailes, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if(budget >= spent && budget >=cost) {
      let newData = [...data, detailes];
      setData(newData);
      setDetailes({
        item: "",
        cost: "",
      });

      setBudget(budget - cost);
      setSpent(parseInt(cost) + parseInt(spent));
    } else {
      alert("max limit reached");
    }
  };
  const deleteHandler = (IndexValue) => {
    const FilteredTodo = data.filter((elem, index) => index !== IndexValue);
    setData(FilteredTodo);
  };
  
  const { item, cost } = detailes;
  return (
    <div className="outline">
      <div>
        <h1 className="text-center">Zen Budget Planner</h1>
        <div className="align">
          <div className="card1">
            <h3 className="text">
              {price ? (
                <div className=" d-flex flex-row">
                  {" "}
                  <h4> Budget ₹ {bal} </h4>{" "}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setPrice(!price)}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <>
                  <form onSubmit className="d-flex flex column gap-2">
                    <input
                      type="text"
                      className="form-control w-75"
                      placeholder=" enter amount"
                      value={editBudget}
                    onChange={(event)=> {setEditBudget(event.target.value)}}
                    />{" "}
                    <button type="button" onClick={()=> {setBal(editBudget);
                    setPrice(true)}} className="btn btn-primary btn-sm">
                      Save
                    </button>
                  </form>
                </>
              )}
            </h3>
          </div>
          <div className="card2">
            <h3 className="text1">Budget: &nbsp;₹ {budget}</h3>
          </div>
          <div className="card3">
            <h3 className="text2">Budget: &nbsp;₹ {spent} </h3>
          </div>
        </div>
        <div style={{ marginTop: "100px" }}>
          <table className="table ">
            <tbody>
              {data.map((todo, index) => {
                return (
                  <tr className="align border border p-2 ">
                    <div>{todo.item}</div>
                    <div
                      style={{ marginLeft: "600px" }}
                      className="bg-primary rounded-4"
                    >
                      {" "}
                      {todo.cost}{" "}
                    </div>
                    <span>
                      {" "}
                      <img
                        src={Circle}
                        onClick={() => deleteHandler(index)}
                        alt="img 1"
                      />
                    </span>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <h3>New Expenses</h3>
          <form onSubmit={submitHandler}>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  name="item"
                  placeholder="item name"
                  value={item}
                  onChange={changeHandler}
                />
              </div>
              <div class="col">
                <input
                  type="number"
                  class="form-control"
                  placeholder=" item price"
                  name="cost"
                  value={cost}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <button
              type="submit"
              style={{ marginTop: "30px" }}
              className="bg-primary text-white "
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Budget;
