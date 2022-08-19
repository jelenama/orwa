import React, { useState } from "react";
import './categories.css';
import { useLocation,Link } from 'react-router-dom'
import ScoresService from '../services/ScoresService';
import Message from './Message';
import {Button } from '../globalStyles';

const Categories = (props) => {
  const location = useLocation()
  const { from, id, datum } = location.state
  const [imeTima, setTimName] = useState("");
  const [kategorija, setKategorija] = useState("");
  const [message, setMessage] = useState(null);

  const [score, setScore] = useState({
    ime_tima: "",
    natjecanje_id: id,
    datum: datum,
    cat_pom_score: 0,
    cat_hh_score: 0,
    cat_style_execution: "",
    mov_style_execution: "",
    skill_tec_execution: "",
    synchronization: "",
    uniformity: "",
    spacing: "",
    musicality: "",
    routine: "",
    movement: "",
    overall_effect: ""
  });
  const [scores, setScores] = useState([]);

  const handleKat = (kat) => {
    setKategorija(kat);
    
  };

  const handleClick = (id) => {
    setTimName(id);
  };

  const onSubmit = e => {
    e.preventDefault();
    score.ime_tima=imeTima;
    if (kategorija === 'cat_pom_score') {
      score.cat_pom_score = parseFloat(score.cat_style_execution) + parseFloat(score.mov_style_execution)+ parseFloat(score.skill_tec_execution)+
    parseFloat(score.synchronization)+parseFloat(score.uniformity)+ parseFloat(score.spacing)+
     parseFloat(score.musicality)+parseFloat(score.routine)+ parseFloat(score.movement)+parseFloat(score.overall_effect);
     console.log(score.cat_pom_score)
    }
    else if (kategorija === 'cat_hh_score') {
      score.cat_hh_score = parseFloat(score.cat_style_execution) + parseFloat(score.mov_style_execution)+ parseFloat(score.skill_tec_execution)+
    parseFloat(score.synchronization)+parseFloat(score.uniformity)+ parseFloat(score.spacing)+
     parseFloat(score.musicality)+parseFloat(score.routine)+ parseFloat(score.movement)+parseFloat(score.overall_effect);
     console.log(score.cat_hh_score)
    }
    ScoresService.postScores(score).then(data => {
      const { message } = data;
      resetForm();
      ScoresService.getScores().then(getData => {
        setScores(getData);
        setMessage(message);
      });
    });
  }


  const resetForm = () => {
    setScore({
      ime_tima: "",
      natjecanje_id: id,
      datum: datum,
      cat_pom_score: 0,
      cat_hh_score: 0,
      cat_style_execution: "",
      mov_style_execution: "",
      skill_tec_execution: "",
      synchronization: "",
      uniformity: "",
      spacing: "",
      musicality: "",
      routine: "",
      movement: "",
      overall_effect: ""
    });
  }

  const handleChange = (score) => {
    const { name, value } = score.target;
    setScore((prevState) => {
      return {
        ...prevState,
        [name]: value,
        

      };
    });
  };

 /*  const countScore = () => {
    
    
    
  } */



  return (
    <div>

      <div className='container'>
        <ul className="sidebar">
          <ul>
          <li><span>KATEGORIJE</span></li>
          </ul>
          <ul>
          <li onClick={handleKat.bind(this, "cat_pom_score")}><span><i className="cat_pom"></i></span><span>CATEGORY CHEER POM</span></li>
          <li onClick={handleClick.bind(this, "Cheerleading club Noa")} ><span><i className="cat_pom"></i></span><span>Cheerleading club Noa</span></li>
          <li onClick={handleClick.bind(this, "Sedmi Vjetar")}  ><span><i className="cat_pom"></i></span><span>Sedmi Vjetar</span></li>
          <li onClick={handleClick.bind(this, "Lana")}  ><span><i className="cat_pom"></i></span><span>Lana</span></li>
          </ul>
          <ul>
          <li onClick={handleKat.bind(this, "cat_hh_score")} ><span><i className="cat_hh"></i></span><span>CATEGORY CHEER HIP-HOP</span></li>
          <li onClick={handleClick.bind(this, "Cheerleading club Noa")} ><span><i className="cat_hh"></i></span><span>Cheerleading club Noa</span></li>
          <li onClick={handleClick.bind(this, "Sedmi Vjetar")}  ><span><i className="cat_hh"></i></span><span>Sedmi Vjetar</span></li>
          <li onClick={handleClick.bind(this, "Lana")}  ><span><i className="cat_hh"></i></span><span>Lana</span></li>

        </ul>

        </ul>
        

        <div className="score_container">
          <div className="score_form_container">
            <div className="left">
              <h1>{from}</h1>

              <p>KATEGORIJA -- {kategorija} <br></br> IME TIMA --  {imeTima}  </p>

              <form className="form_container" >

                <h2>TECHNICAL EXECUTION</h2>
                <input
                  type="number"
                  placeholder="Category Style Execution"
                  value={score.cat_style_execution}
                  name="cat_style_execution"
                  required
                  className="input"
                  onChange={handleChange}
                  
                />

                <input
                  type="number"
                  placeholder="Movement Technique Execution"
                  value={score.mov_style_execution}
                  name="mov_style_execution"
                  required
                  className="input"
                  onChange={handleChange}
                />

                <input
                  type="number"
                  placeholder="Skill Technique Execution"
                  value={score.skill_tec_execution}
                  name="skill_tec_execution"
                  required
                  className="input"
                  onChange={handleChange}
                />

                <h2>GROUP EXECUTION</h2>
                <input
                  type="number"
                  placeholder="Synchronization/Timing with Music"
                  value={score.synchronization}
                  name="synchronization"
                  required
                  className="input"
                  onChange={handleChange}
                />

                <input
                  type="number"
                  placeholder="Uniformity of Movement"
                  value={score.uniformity}
                  name="uniformity"
                  required
                  className="input"
                  onChange={handleChange}
                />

                <input
                  type="number"
                  placeholder="Spacing"
                  value={score.spacing}
                  name="spacing"
                  required
                  className="input"
                  onChange={handleChange}
                />

                <h2>CHOREOGRAPHY</h2>
                <input
                  type="number"
                  placeholder="Musicality"
                  value={score.musicality}
                  name="musicality"
                  required
                  className="input"
                  onChange={handleChange}
                />

                <input
                  type="number"
                  placeholder="Routine Staging/Visual Effects"
                  value={score.routine}
                  name="routine"
                  required
                  className="input"
                  onChange={handleChange}
                />

                <input
                  type="number"
                  placeholder="Complexity of Movement"
                  value={score.movement}
                  name="movement"
                  required
                  className="input"
                  onChange={handleChange}
                />

                <h2>OVERALL EFFECT</h2>
                <input
                  type="number"
                  placeholder="Communication/Projection/Audience Appeal/Appropriateness"
                  value={score.overall_effect}
                  name="overall_effect"
                  required
                  className="input"
                  onChange={handleChange}
                />
{/*                 <input type="text" id={kategorija} value={score.cat_pom_score} onClick={countScore} readOnly/>
                <input type="text" id={kategorija} value={score.cat_hh_score} onClick={countScore} readOnly/> */}
                <br></br>
                <button type="submit" onClick={onSubmit} className="pink_btn">
                  SUBMIT
                </button>
              </form>
              {message ? <Message message={message} /> : null}
            </div>
          </div>
        </div>
        <div className="right">
        <Link to='/results' state={{ id:location.state.id}}  >
                  <Button>
                    REZULTATI
                  </Button>
                </Link>
                </div>
      </div>
    </div>
  );
};

export default Categories