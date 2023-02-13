import React,{useState,useEffect} from 'react'
import { useParams ,useNavigate} from "react-router-dom";
import evenementService from "../../../services/evenementService";
import { formatDateYYYYMMdd } from '../../../utils/formatDate';

const Evenement = (props) => {

    const { id }= useParams();
    let navigate = useNavigate();
    const initialEvenementState = {
        id: null,
        dateEvent: "",
        heureDebutEvent: "",
      };
      const [currentEvenement, setCurrentEvenement] = useState(initialEvenementState);
      const [message, setMessage] = useState("");
    
      const getEvenement = id => {
        evenementService.get(id)
          .then(response => {
            let dateEvent = formatDateYYYYMMdd(new Date(response.data.dateEvent));
            setCurrentEvenement({...response.data,dateEvent});
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      useEffect(() => {
        if (id)
          getEvenement(id);
      }, [id]);
    
      const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentEvenement({ ...currentEvenement, [name]: value });
      };
    
      const updatePublished = status => {
        var data = {
          id: currentEvenement.id,
          title: currentEvenement.title,
          description: currentEvenement.description,
          published: status
        };
    
        evenementService.update(currentEvenement.id, data)
          .then(response => {
            setCurrentEvenement({ ...currentEvenement, published: status });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      const updateEvenement = () => {
        evenementService.update(currentEvenement.id, currentEvenement)
          .then(response => {
            console.log(response.data);
            setMessage("The Evenement was updated successfully!");
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      const deleteEvenement = () => {
        evenementService.remove(currentEvenement.id)
          .then(response => {
            console.log(response.data);
            navigate("/Evenements");
          })
          .catch(e => {
            console.log(e);
          });
      };
    
      return (
        <div>
          {currentEvenement && (
            <div className="edit-form">
              <h4>Evenement</h4>
              <form>
              <div class="form-row">
                    <div className="form-group col">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateEvent"
                    name="dateEvent"
                    value={currentEvenement.dateEvent}
                    onChange={handleInputChange}
                  />
                   </div>
                   <div className="form-group col">
                  <label htmlFor="Heure">Heure</label>
                  <input
                    type="text"
                    className="form-control"
                    id="natureEvent"
                    name="heureDebutEvent"
                    value={currentEvenement.heureDebutEvent}
                    onChange={handleInputChange}
                  />
                  </div>
                  <div class="form-group col">
                    <label for="inputAddress">Nature Evenement</label>
                    <select id="inputState" class="form-control" name="natureEvent" value={currentEvenement.natureEvent} onChange={handleInputChange}>
                       <option value="null">-Choisir la Nature Evenement-</option>
                       <option value="ACCIDENT">ACCIDENT</option>
                       <option value="PANNE">PANNE</option>
                       <option value="VEHICULE EN FEU">VEHICULE EN FEU</option>
                       <option value="SUITE ACCIDENT">SUITE ACCIDENT</option>
                       <option value="AUTRE">AUTRE</option>
                   </select>
                  </div>
                  <div class="form-group col">
                    <label for="inputAddress2">Address 2</label>
                    <input type="text"
                     class="form-control" 
                     id="inputAddress2"
                     value={currentEvenement.dateEvent}
                     onChange={handleInputChange}
                      />
                </div>
          </div>
   
 
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity"/>
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip"/>
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck"/>
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>

                
    
              </form>
    
  
               <p>{message}</p>
               </div> 
          )}
         </div>
      )      
      
}
export default Evenement
