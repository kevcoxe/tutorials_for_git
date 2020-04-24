import React, { useState } from 'react';
import Workbench from './Workbench';

const App = () => {

  const [ pages, setPages ] = useState([])
  const [ creating, setCreating ] = useState(false)

  const stopCreating = () => {
    console.log('stopping creating')
    setCreating(false)
  }

  const addPage = (page) => {
    console.log('adding page')
    setPages([...pages, page])
    setCreating(false)
  }

  return (
    <div>
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">Tutorials For Github</a>
            </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="active"><a href="/">Home</a></li>
            </ul>
          </div>
        </div>
      </div>
      { creating ? (
          <Workbench
            stopCreating={stopCreating}
            addPage={addPage}
          />
        ) : (
          <div>
            <div className="jumbotron">
                <div className="container">
                <h1>Tutorial Creator For Github</h1>
                <p>Lets make something!</p>
                <p><a className="btn btn-success btn-lg" role="button" onClick={() => setCreating(true)}>Get Started</a></p>
                </div>
            </div>
            { pages.map((page, i) => {
              console.log(page)
              return (
                <div className="row" key={i}>
                  <div className="col-md-12">
                      <div className="well">
                        <h2>{ page.title }</h2>
                        { page.steps.map((step, j) => {
                          return (
                            <div className="container" key={`${i}${j}`}>
                              <div className="row">
                                <p>{ step.instruction }</p>
                              </div>
                              <div className="row">
                                <p>{ step.code }</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
      )}
    </div>
  );
}

export default App;
