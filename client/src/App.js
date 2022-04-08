import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import Header from './components/layout/Header';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Project from './pages/Project/Project';
import ChooseTemplate from './pages/Template/ChooseTemplate';
import UploadImage from './pages/Upload/UploadImage';
import GLTFModel from './pages/BuildModel/GLTFModel';
import GLBModel from './pages/BuildModel/GLBModel';
import USDZModel from './pages/BuildModel/USDZModel';
import Footer from './components/layout/Footer';

//Admin Panel
import UserManage from './pages/Admin/UserManage/UserManage';
import TemplateList from './pages/Admin/TemplateManage/TempateList';

import { checkAuthenticate } from './redux/actions/userActions';
import './App.css';
import ARModel from './pages/BuildModel/ARModel';
import UserPanel from './pages/User/UserPanel';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { pending } = useSelector(state => state.auth);

  useLayoutEffect(() => {
    dispatch(checkAuthenticate(history));
  }, [dispatch, history]);

  return (
    <BrowserRouter>
      {
        pending && <div className="mask"></div>
      }
      <Header />
      <div className="content" style={{position: 'relative'}}>
        {
          pending && <div
            style={{
              position: 'absolute',
              width: "100%",
              height: "100%",
              minHeight: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Loader type="ThreeDots" color="black" height="100" width="100" />
          </div>
        }
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Project} />
          <Route exact path="/template/:project_name" component={ChooseTemplate} />
          <Route exact path="/upload/:project_name" component={UploadImage} />
          <Route exact path="/web-build/:project_name" component={GLTFModel} />
          <Route exact path="/android-build/:project_name" component={GLBModel} />
          <Route exact path="/ios-build/:project_name" component={USDZModel} />
          <Route exact path="/user_manage" component={UserManage} />
          <Route exact path="/template_manage" component={TemplateList} />
          <Route exact path="/ar-build/:project_name" component={ARModel} />
          <Route exact path={["/user/dashboard", "/user/ar-tool", "/user/templates", "/user/projects"]} component={UserPanel} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
