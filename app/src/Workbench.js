import React, { useState } from 'react';

const Workbench = ({ stopCreating, addPage }) => {

    const [ steps, setSteps ] = useState([])
    const [ instruction, setInstruction ] = useState('')
    const [ code, setCode ] = useState('')

    const createAndAddPage = () => {
        console.log('create and add page')
        addPage({
            title: 'this is a tes page',
            steps: steps
        })
    }

    const addStep = (callback) => {
        console.log('adding step')
        if (instruction && code) {
            const newStep = {
                instruction: instruction,
                code: code
            }

            setSteps([...steps, newStep])

            setInstruction('')
            setCode('')
        }
    }

    const finish = () => {
        console.log('finishing')
        addStep()
        createAndAddPage()
    }

    return (
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h1>Welcome to the workbench</h1>
                </div>
            </div>

            <div className="container">
                <div className="page-header">
                    <h1>Start Creating <small>add instructions and code</small></h1>
                </div>
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Enter your instructions for your code here!</h3>
                            <textarea className="form-control" rows="20" name="instruction" value={instruction} onChange={e => setInstruction(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Enter your code here!</h3>
                            <textarea className="form-control" rows="20" name="code" value={code} onChange={e => setCode(e.target.value)}></textarea>
                        </div>
                    </div>

                    <br/>

                    <div className="row">
                        <div className="col-md-10"></div>
                        <div className="col-md-1">
                            <p><a className="btn btn-success btn-lg" role="button" onClick={() => finish()}>Finish</a></p>
                        </div>
                        <div className="col-md-1">
                            <p><a className="btn btn-default btn-lg" role="button" onClick={() => addStep()}>Next Step</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workbench;
