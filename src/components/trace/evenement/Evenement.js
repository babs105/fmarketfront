import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import evenementService from "../../../services/evenementService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Evenement = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialEvenementState = {
    id: null,
    dateEvent: "",
    heureDebutEvent: "",
    natureEvent: "",
    causeEvent: "",
    matVehicule: "",
    causeEvent: "",
    causeEvent: "",
    causeEvent: "",
    causeEvent: "",
    causeEvent: "",
    causeEvent: "",
    causeEvent: "",
    causeEvent: "",
    causeEvent: "",
  };
  // const [currentEvenement, setCurrentEvenement] = useState(
  //   initialEvenementState
  // );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    dateEvent: Yup.date().required("date evenement est obligatoite"),
    natureEvent: Yup.string().required("Nature Evenement est obligatoire"),
    heureDebutEvent: Yup.string().required("Heure evenement est obligatoire"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const getEvenement = (id) => {
    evenementService
      .get(id)
      .then((response) => {
        let dateEvent = formatDateYYYYMMdd(new Date(response.data.dateEvent));
        const currentEvenement = { ...response.data, dateEvent };
        console.log(response.data);

        // Object.keys(initialEvenementState).forEach((field) =>
        //   setValue(field, currentEvenement[field])
        // );
        setValue(currentEvenement);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getEvenement(id);
  }, [id]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setCurrentEvenement({ ...currentEvenement, [name]: value });
  // };

  // const updatePublished = (status) => {
  //   var data = {
  //     id: currentEvenement.id,
  //     title: currentEvenement.title,
  //     description: currentEvenement.description,
  //     published: status,
  //   };

  //   evenementService
  //     .update(currentEvenement.id, data)
  //     .then((response) => {
  //       setCurrentEvenement({ ...currentEvenement, published: status });
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const updateEvenement = () => {
  //   evenementService
  //     .update(currentEvenement.id, currentEvenement)
  //     .then((response) => {
  //       console.log(response.data);
  //       setMessage("Evenement modifie avec succes!");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const deleteEvenement = () => {
  //   evenementService
  //     .remove(currentEvenement.id)
  //     .then((response) => {
  //       console.log(response.data);
  //       navigate("/evenements");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log(data);
    // authService.login(data).then(
    //   () => {
    //     console.log("OK login");
    //     // navigate("/home");
    //     window.location.reload();
    //   },
    //   (error) => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     setLoading(false);
    //     setMessage(resMessage);
    //   }
    // );
  };

  return (
    <div>
      {/* {currentEvenement && ( */}
      <div className="edit-form">
        <h4>Evenement</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="form-row">
            <div className="form-group col">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="dateEvent"
                name="dateEvent"
                // value={currentEvenement.dateEvent}
                // onChange={handleInputChange}
                {...register("dateEvent")}
                className={`form-control ${
                  errors.dateEvent ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.dateEvent?.message}
              </div>
            </div>
            <div className="form-group col">
              <label htmlFor="Heure">Heure</label>
              <input
                type="text"
                id="Heure"
                name="heureDebutEvent"
                {...register("heureDebutEvent")}
                className={`form-control ${
                  errors.heureDebutEvent ? "is-invalid" : ""
                }`}
                // value={currentEvenement.heureDebutEvent}
                // onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                {errors.heureDebutEvent?.message}
              </div>
            </div>
            <div class="form-group col">
              <label for="natureEvent">Nature Evenement</label>
              <select
                id="inputState"
                name="natureEvent"
                {...register("natureEvent")}
                className={`form-control ${
                  errors.natureEvent ? "is-invalid" : ""
                }`}
                // value={currentEvenement.natureEvent}
                // onChange={handleInputChange}
              >
                <option value="null">-Choisir la Nature Evenement-</option>
                <option value="ACCIDENT">ACCIDENT</option>
                <option value="PANNE">PANNE</option>
                <option value="VEHICULE EN FEU">VEHICULE EN FEU</option>
                <option value="SUITE ACCIDENT">SUITE ACCIDENT</option>
                <option value="AUTRE">AUTRE</option>
              </select>
              <div className="invalid-feedback">
                {errors.natureEvent?.message}
              </div>
            </div>
            <div class="form-group col">
              <label for="causeEvent">Cause Evenement</label>
              <select
                id="inputState"
                name="causeEvent"
                {...register("causeEvent")}
                className={`form-control ${
                  errors.causeEvent ? "is-invalid" : ""
                }`}
                // value={currentEvenement.natureEvent}
                // onChange={handleInputChange}
              >
                <option value="MOTEUR">MOTEUR</option>
                <option value="CREVAISION">CREVAISION</option>
                <option value="VEHICULE EN FEU">VEHICULE EN FEU</option>
                <option value="CARBURANT">CARBURANT</option>
                <option value="DEFAUT FREINAGE">DEFAUT FREINAGE</option>
                <option value="EMBRAYAGE">EMBRAYAGE</option>
                <option value="VITESSE">VITESSE</option>
                <option value="ECLATEMENT PNEU">ECLATEMENT PNEU</option>
                <option value="PERTE DE CONTRÔLE">PERTE DE CONTRÔLE</option>
                <option value="SOMNOLENCE CHAUFFEUR">
                  SOMNOLENCE CHAUFFEUR
                </option>
                <option value="COLLISION">COLLISION</option>
                <option value="ABANDON">ABANDON</option>
                <option value="PROBLEME MECANIQUE">PROBLEME MECANIQUE</option>
                <option value="CRAMBOLAGE">CRAMBOLAGE</option>
                <option value="CHAUFFAGE">CHAUFFAGE</option>
                <option value="AUTRE">AUTRE</option>
              </select>
              <div className="invalid-feedback">
                {errors.causeEvent?.message}
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">City</label>
              <input type="text" class="form-control" id="inputCity" />
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
              <input type="text" class="form-control" id="inputZip" />
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck" />
              <label class="form-check-label" for="gridCheck">
                Check me out
              </label>
            </div>
          </div>
        </form>
        <p>{message}</p>
      </div>
      {/* )} */}
    </div>
  );
};
export default Evenement;
