import React from 'react'
import { Link } from 'react-router-dom'
const Carburant = () => {
    return (
        <div>
        <div className="container">
      <div className="row">
        <div className="col">
        <div class="card">
      <h5 class="card-header">Cuves </h5>
      <div class="card-body">
        <p class="card-text">Modules Cuve.</p>
        <Link activeClassName="active" to={'/carburant/cuves'} class="btn btn-primary">Gestion des Cuves</Link>
      </div>
    </div>
         
        </div>
        <div className="col">
        <div class="card">
      <h5 class="card-header">Ravitaillements</h5>
      <div class="card-body">
        <p class="card-text">Modules Ravitaillements.</p>
        <Link to={'/trace/accidents'} class="btn btn-primary">Gestion des Ravitaillements</Link>
      </div>
    </div>
        </div>
        <div className="col">
        <div class="card">
      <h5 class="card-header">Rajouts</h5>
      <div class="card-body">
        <p class="card-text">Modules Remorquages..</p>
        <Link to={'/trace/remorquages'} class="btn btn-primary">Gestion des remorrquages</Link>
      </div>
    </div>
         
        </div>
      </div>
    </div>
    
        </div>
      )
}

export default Carburant
