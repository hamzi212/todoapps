// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

// import { useState } from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { editableInputTypes } from '@testing-library/user-event/dist/utils';

// function APP () {
//     const [txt, setTxt] = useState("abc");
//     const[txtList, setTxtlist] = useState<any>([]); 

//     const del = (i: any) => {
//         txtList.splice(i, 1);
//         setTxtlist([...txtList]);
//     };

//     return (
//         <div className="App">
//             <p>{txt}</p>
//             <input
//             type="text"
//             onChange={(e)=> {
//             console.log (e.target.value)
//             setTxt(e.target.value)
//             }}
                  
//             />
//             <button onClick={() => {
//                 txtList.push(txt);
//                 console.log(txtlist);
//                 setTxtlist([...txtList]);
//             } }
//             >
//                 Add
//             </button>
            
//             {txtList.map((x: any, i: any) => {
//                 return <p key={i}>{x}</p>;
//             }  ) }
            
//         </div>
//     );
// }


import { useState } from 'react';
import './App.css';
import './bootstrap-5.2.3-dist/bootstrap-5.2.3-dist/css/bootstrap.min.css'
import { editableInputTypes } from '@testing-library/user-event/dist/utils';
function App() {
  const [List, setList] = useState([])
  const [inpVal, setInpVal] = useState("")
  const [EditMode, setEditMode] = useState({ index: null, mode: false })

  let AddBTN = (e) => {
    if (inpVal.length > 0 && !EditMode.mode) {
      e.target.innerText = "ADD"
      setList([...List, inpVal])
      setInpVal("")
    } else
      if (inpVal.length > 0 && EditMode.mode) {
        EditList(EditMode.index)
        setEditMode({ index: null, mode: false })
        setInpVal("")
      }
  }

  let EditList = (i) => {
    List[i] = inpVal
    setList([...List])
  }
  let DeleteBTN = (e) => {
    let index = e.target.parentElement.parentElement.dataset.index
    List.splice(index, 1)
    setList([...List])
  }

  let EditBTN = (e) => {
    setInpVal(e.target.parentElement.parentElement.innerText.split('\n')[0])
    setEditMode({ mode: true, index: Number(e.target.parentElement.parentElement.dataset.index) })
  }


  return (
    <>
      <div className="container-fluid vh-100 p-5" style={{ backgroundColor: '#e6ebe9' }}>
        <div className="container bg-white shadow h-100 rounded overflow-hidden">
          <div className="row">
            <div className="p-0 m-0 w-100">
              <input type="text" onChange={(e) => { setInpVal(e.target.value) }} value={inpVal} className=" border-0 py-2 px-4 rounded w-100" placeholder="Enter Todo " />
              <button onClick={AddBTN} className="btn btn-primary w-100 fw-bolder rounded-0">{!EditMode.mode ? "ADD" : "Edit"}</button>
            </div>
          </div>
          <div className="row w-100 h-100">
            <ul className="p-3 h-100">

              {List.map((x, i) => {
                return <li key={i} data-index={i} className="list-unstyled my-2 py-2 border-bottom d-flex justify-content-between fw-bold ">
                  {x}
                  <span>
                    <button onClick={EditBTN} disabled={EditMode.mode} className="mx-1 btn btn-success">Edit</button>
                    <button onClick={DeleteBTN} disabled={EditMode.mode} className="mx-1 btn btn-danger">Delete</button>
                  </span>
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>


    </>
  )
}

export default App;