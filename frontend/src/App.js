import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './component/Home.jsx';
import LogIn from './component/logIn.jsx';
import CreateAccount from './component/CreateAccount.jsx';
import SchedulingAppt from './component/schedulingAppt.jsx';
import ViewMedHist from './component/ViewMedHist.jsx';
import DocHome from './component/DocHome.jsx';
import ViewOneHistory from './component/ViewOneHistory.jsx';
import Settings from './component/Settings.jsx';
import DocSettings from './component/DocSettings.jsx';
import PatientsViewAppt from './component/PatientsViewAppt.jsx';
import NoMedHistFound from './component/NoMedHistFound.jsx';
import DocViewAppt from './component/DocViewAppt.jsx';
import MakeDoc from './component/MakeDoc.jsx';
import Diagnose from './component/Diagnose.jsx';
import ShowDiagnoses from './component/ShowDiagnoses.jsx';

export default function App() {
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/userInSession")
      .then(res => res.json())
      .then(res => {
        setUserSession(res);
      })
      .catch(error => {
        console.error("Error fetching user session:", error);
      });
  }, []);

  if (!userSession) {
    // If user session data is not yet available, display a loading message or spinner
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/ApptList" element={<DocViewAppt/>} />
          <Route path="/createAcc" element={<CreateAccount />} />
          <Route path="/Diagnose/:id" element={<Diagnose />} />
          <Route path="/DocHome" element={<DocHome />} />
          <Route path="/DocSettings" element={<DocSettings/>} />
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/MakeDoc" element={<MakeDoc />} />
          <Route path="/MedHistView" element={<ViewMedHist />} />
          <Route path="/NoMedHistFound" element={<NoMedHistFound />} />
          <Route path="/PatientsViewAppt" element={<PatientsViewAppt/>} />
          <Route path="/scheduleAppt" element={<SchedulingAppt />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/showDiagnoses/:id" element={<ShowDiagnoses />} />
          <Route name="onehist" path="/ViewOneHistory/:email" element={<ViewOneHistory />} />
        </Routes>
      </div>
    </Router>
  );
}
