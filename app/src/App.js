import React, { useReducer } from 'react';
import Workbench from './Workbench';


const CreatePageHtml = ({ pageInfo, height, hideResults, returnFile = false }) => {

  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  const createStepTemplate = ({ stepNumber, instruction, exampleCode }) => {
    return (
      `<h3>
          <a id="welcome-to-github-pages" class="anchor" href="#welcome-to-github-pages" aria-hidden="true">
              <span class="octicon octicon-link"></span>
          </a>Step {{ step_number }}
      </h3>

      {{ instruction }}

      {{ example_code }}
      `.replace('{{ step_number }}', stepNumber)
        .replace('{{ instruction }}', instruction)
        .replace('{{ example_code }}', exampleCode)
    )
  }

  const createMainTemplate = ({ cssLinks, title, steps }) =>{
    return (
      `<!DOCTYPE html>
        <html>
            <head>
                <meta charset='utf-8'>
                <meta http-equiv="X-UA-Compatible" content="chrome=1">
                {{ css_links }}
                <title>Tutorial</title>
            </head>
            <body>
                <header>
                    <div class="container">
                        <h1>{{ title }}</h1>
                    </div>
                </header>
                <div class="container">
                    <section id="main_content">
                      {{ steps }}
                    </section>
                </div>
            </body>
        </html>
      `.replace('{{ css_links }}', cssLinks)
        .replace('{{ title }}', title)
        .replace('{{ steps }}', steps)
    )
  }

  const cssLinkText = [
    'http://kevcoxe.github.io/Simple-Flask-App/stylesheets/stylesheet.css',
    'http://kevcoxe.github.io/Simple-Flask-App/stylesheets/pygment_trac.css'
  ]

  const getTemplateWithBlobUrls = () => {
    const template = createMainTemplate({
      cssLinks: cssLinkText.map(link => `<link rel="stylesheet" type="text/css" href="${getBlobURL(link, 'text/css')}" media="screen">`).join(' '),
      title: pageInfo.title,
      steps: pageInfo.steps.map((step, stepNumber) => {
        return createStepTemplate({
          stepNumber: stepNumber,
          instruction: step.instruction,
          exampleCode: step.exampleCode
        })
      }).join(' ')
    })

    return template
  }

  const getTemplateWithoutBlobUrls = () => {
    const template = createMainTemplate({
      cssLinks: cssLinkText.map(link => `<link rel="stylesheet" type="text/css" href=${link} media="screen">`).join(' '),
      title: pageInfo.title,
      steps: pageInfo.steps.map((step, stepNumber) => {
        return createStepTemplate({
          stepNumber: stepNumber,
          instruction: step.instruction,
          exampleCode: step.exampleCode
        })
      }).join(' ')
    })

    return template
  }

  const createAndPromptDownload = () => {
    const template = getTemplateWithoutBlobUrls()
    const filename = 'tutorialpage.html'
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(template));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  if (returnFile) {
    return createAndPromptDownload()
  } else {
    const template = getTemplateWithoutBlobUrls()

    return (
      <>
        <button class="btn input-block-level form-control" onClick={hideResults} >Back Home</button>
        <iframe title="sample view" srcdoc={template} width="100%" height={height}></iframe>
      </>
    )
  }

}

const initialPageState = {
  title: 'Your github tutorial',
  steps: [],
  instruction: '',
  exampleCode: '',
  creating: false,
  veiwResult: false
}

const pageReducer = (state, action) => {
  switch (action.type) {
    case 'update page': {
      return {
        ...initialPageState, creating: true
      }
    }
    case 'finished updating': {
      if (state.instruction || state.exampleCode) {
        return {
          ...state,
          steps: [...state.steps, {
            instruction: state.instruction,
            exampleCode: state.exampleCode
          }],
          instruction: '',
          exampleCode: '',
          creating: false
        }
      } else {
        return { ...state, creating: false }
      }
    }
    case 'add step': {
      return {
        ...state,
        steps: [...state.steps, {
          instruction: state.instruction,
          exampleCode: state.exampleCode
        }],
        instruction: '',
        exampleCode: ''
      }
    }
    case 'update title': {
      return { ...state, title: action.data }
    }
    case 'update instruction': {
      return { ...state, instruction: action.data }
    }
    case 'update exampleCode': {
      return { ...state, exampleCode: action.data }
    }
    case 'view results': {
      return { ...state, veiwResult: true }
    }
    case 'hide results': {
      return { ...state, veiwResult: false }
    }
    default:
      return state
  }

}

const App = () => {
  const [state, dispatch] = useReducer(pageReducer, initialPageState)
  const { steps, creating, veiwResult } = state

  var body = document.body, html = document.documentElement;
  var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
  height = window.innerHeight

  const addStep = () => {
    dispatch({ type: 'add step' })
  }

  const updateTitle = (newTitle) => {
    dispatch({
      type: 'update title',
      data: newTitle
    })
  }

  const updateInstruction = (newInstruction) => {
    dispatch({
      type: 'update instruction',
      data: newInstruction
    })
  }

  const updateCode = (newCode) => {
    dispatch({
      type: 'update exampleCode',
      data: newCode
    })
  }

  const showResults = () => {
    dispatch({ type: 'view results' })
  }

  const hideResults = () => {
    dispatch({ type: 'hide results' })
  }

  const showEditPage = () => { dispatch({ type: 'update page' }) }
  const finishedEditing = () => { dispatch({ type: 'finished updating' }) }
  const downloadHtml = () => {
    CreatePageHtml({pageInfo: state, returnFile: true})
  }

  return (
    <>
      {veiwResult ? (
        <CreatePageHtml pageInfo={state} height={height} hideResults={hideResults} />
      ) : (
        <div id="main">
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
          {creating ? (
            <Workbench
              state={state}
              addStep={addStep}
              updateTitle={updateTitle}
              updateInstruction={updateInstruction}
              updateCode={updateCode}
              finishedEditing={finishedEditing}
            />
          ) : (
              <div>
                <div className="jumbotron">
                  <div className="container">
                    <h1>Tutorial Creator For Github</h1>
                    <p>Lets make something!</p>
                    <p><button className="btn btn-success btn-lg" onClick={showEditPage}>{steps.length > 0 ? 'Start over' : 'Get Started'}</button></p>
                    { steps.length > 0 && (
                      <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary" onClick={downloadHtml}>Download HTML</button>
                        <button type="button" class="btn btn-info" onClick={showResults}>Live View</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </>
  );
}

export default App;
