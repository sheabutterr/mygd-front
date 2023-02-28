import axios from "axios";
import { useEffect, useState } from "react";


const HighB = ({history}) => {
    const [project, setProject] = useState([]); 

    useEffect(() => {
        axios.get(`http://192.168.0.53:8080/classList/8`)
        .then(response => {
            console.log(response);
            setProject(response.data);
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <>
           <div className="class_box">               
                <div className="image_box">
                    <img className="class_image" src={"http://192.168.0.53:8080" + project.classImage} />
                </div>
                <div className="intro_box">
                    <p>{project.className} &nbsp;&#124;&nbsp; {project.classPeriod}</p>
                </div>
                <div className="detail_box">
                    <ul>
                        <li>강사 <b>{project.classLecturerName}</b></li><br />
                        <hr /><br />                      
                        <li>{project.classTarget1}</li><br />
                        <li>{project.classText1}</li>
                        <li>{project.classText2}</li>
                        <li>{project.classText3}</li>
                        <li>{project.classText4}</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default HighB;