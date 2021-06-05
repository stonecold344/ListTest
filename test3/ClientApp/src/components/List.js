import React, { useState, useEffect } from "react";

const List = (props) => {
  const [load, setLoad] = useState(false);
  const [list, setList] = useState([]);

    useEffect(() => {
        if (load) {
            populateListData();
        }
    },[load])

    const populateListData = async () => {
        const response = await fetch('list');
        const data = await response.json();
        console.log(data)
        setList(data);
    }

    const loadList = () => {
        populateListData();
        setLoad(true);
  };

  return (
    <div className="container box  p-0 bg-white h-md-100 h-100 col-lg-6">
      <div className=" d-flex justify-content-center align-items-center h-md-100 ">
        <div className="h-100 scroll">
          <h1 className="text2 text-center">Image List</h1>
                  <ul className="d-flex flex-column list-group p-1">
                 {load?(list.length > 0?(list.map((item) => {
                  var img = new Image();
                  console.log(item)
                  img.src = item.image.name;
                  return (
                    <li
                      className="d-flex align-items-center p-2 list-group-item"
                      key={item.id}
                    >
                      <div className="d-flex">
                        <h4 className="d-flex justify-content-center flex-column">
                          {item.title}
                        </h4>

                        <img
                            className="p-2 h-50 w-50 border image"
                            src={item.image}
                            alt=""
                          />
                      </div>
                    </li>
                     );
                 })) : (null)) : (null)}
          </ul>

              </div>
        <button className="btn btn-secondary btn-lg btn-bot" onClick={loadList}>
                      Load All Tasks
        </button>
      </div>
    </div>
  );
};

export default List;
