import React from 'react';

const Workbench = ({ state, addStep, updateTitle, updateInstruction, updateCode, finishedEditing }) => {
    const { title, instruction, exampleCode } = state

    return (
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h1>Welcome to the workbench</h1>
                </div>
            </div>

            <div className="container">
                <div className="page-header">
                    <h1>Start Creating <small>add instructions and exampleCode</small></h1>
                    <div class="form-group">
                        <label for="tutorialTitle">Tutorial Title:</label>
                        <input type="text" class="form-control" id="tutorialTitle" value={title} onChange={e => updateTitle(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Enter your instructions for your exampleCode here!</h3>
                            <textarea className="form-control" rows="10" name="instruction" value={instruction} onChange={e => updateInstruction(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Enter your exampleCode here!</h3>
                            <textarea className="form-control" rows="10" name="exampleCode" value={exampleCode} onChange={e => updateCode(e.target.value)}></textarea>
                        </div>
                    </div>

                    <br/>

                    <div className="row">
                        <div className="col-md-10"></div>
                        <div className="col-md-1">
                            <button className="btn btn-success btn-lg" onClick={() => {
                                addStep()
                                finishedEditing()
                            }}>Finish</button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-default btn-lg" onClick={addStep}>Next Step</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workbench;
