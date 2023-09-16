import TextEditor from './TextEditor'

// https://bobbyhadz.com/blog/react-export-redirect-was-not-found-in-react-router-dom#:~:text=To%20solve%20the%20error%20%22export,current%20location%20when%20it%27s%20rendered.

// https://stackoverflow.com/questions/70171991/navigate-is-not-a-route-component-all-component-children-of-routes-must-be
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" 
        element={ <Navigate to={`/documents/${uuidV4()}`}/> }>
        </Route>
        <Route path="/documents/:id" element={<TextEditor />}>      
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
