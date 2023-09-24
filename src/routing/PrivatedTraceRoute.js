import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BalayageList from "../components/trace/balayage/BalayageList";
import AddBalayage from "../components/trace/balayage/AddBalayage";
import EditBalayage from "../components/trace/balayage/EditBalayage";
import NettoyageList from "../components/trace/nettoyage/NettoyageList";
import AddNettoyage from "../components/trace/nettoyage/AddNettoyage";
import EditNettoyage from "../components/trace/nettoyage/EditNettoyage";
import IntrusionList from "../components/trace/intrusion/IntrusionList";
import AddIntrusion from "../components/trace/intrusion/AddIntrusion";
import EditIntrusion from "../components/trace/intrusion/EditIntrusion";
import DesherbageList from "../components/trace/desherbage/DesherbageList";
import AddDesherbage from "../components/trace/desherbage/AddDesherbage";
import EditDesherbage from "../components/trace/desherbage/EditDesherbage";
import SearchEvenement from "../components/trace/evenement/SearchEvenement";
import Layout from "../components/layout/Layout";
import EvenementList from "../components/trace/evenement/EvenementList";
import AddEvenement from "../components/trace/evenement/AddEvenement";
import Evenement from "../components/trace/evenement/Evenement";
import Trace from "../components/trace/Trace";
import AddRemorquage from "../components/trace/evenement/AddRemorquage";
import AddDetailAccident from "../components/trace/evenement/AddDetailAccident";
import SearchDetailAccident from "../components/trace/detailAccident/SearchDetailAccident";
import EditDetailAccident from "../components/trace/evenement/EditDetailAccident";
import EditRemorquage from "../components/trace/evenement/EditRemorquage";
import SearchRemorquage from "../components/trace/remorquage/SearchRemorquage";

const PrivatedTraceRoute = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* <Route index element={<Trace />} /> */}
        <Route index element={<Trace />} />
        <Route path="evenements" element={<EvenementList />} />
        <Route path="evenements/add" element={<AddEvenement />} />
        <Route path="evenements/:id" element={<Evenement />} />
        <Route path="evenements/search" element={<SearchEvenement />} />
        <Route path="event/remorquage/add/:id" element={<AddRemorquage />} />
        <Route path="event/remorquage/edit/:id" element={<EditRemorquage />} />
        <Route
          path="event/detailAccident/add/:id"
          element={<AddDetailAccident />}
        />
        <Route
          path="event/detailAccident/edit/:id"
          element={<EditDetailAccident />}
        />
        <Route path="remorquages/search" element={<SearchRemorquage />} />
        <Route
          path="detailAccidents/search"
          element={<SearchDetailAccident />}
        />
        <Route path="balayages" element={<BalayageList />} />
        <Route path="balayages/add" element={<AddBalayage />} />
        <Route path="balayages/edit/:id" element={<EditBalayage />} />

        <Route path="nettoyages" element={<NettoyageList />} />
        <Route path="nettoyages/add" element={<AddNettoyage />} />
        <Route path="nettoyages/edit/:id" element={<EditNettoyage />} />

        <Route path="intrusions" element={<IntrusionList />} />
        <Route path="intrusions/add" element={<AddIntrusion />} />
        <Route path="intrusions/edit/:id" element={<EditIntrusion />} />

        <Route path="desherbages" element={<DesherbageList />} />
        <Route path="desherbages/add" element={<AddDesherbage />} />
        <Route path="desherbages/edit/:id" element={<EditDesherbage />} />
      </Route>
    </Routes>
  );
};
export default PrivatedTraceRoute;
