import { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import FormContainer from '../form/FormContainer';
import EducationContainerForm from '../education/EducationFormContainer';
import ProfessionalContainerForm from '../professional/ProfessionalContainerForm';
import GeneralFormContainer from './GeneralFormContainer';
import EducationFormItem from '../education/EducationFormItem';
import ResumeHeader from '../resume/ResumeHeader';
import ResumeEducation from '../resume/ResumeEducation';
import ResumeProfessional from '../resume/ResumeProfessional ';
import ProfessionalFormItem from '../professional/ProfessionalFormItem';
import EducationEditForm from '../education/EducationEditForm';
import ProfessionalEditForm from '../professional/ProfessionalEditForm';
import ProjectFormContainer from '../projects/ProjectFormContainer';
import ResumeProject from '../resume/ResumeProject';
import ProjectFormItem from '../projects/ProjectFormItem';
import ProjectEditForm from '../projects/ProjectEditForm';
import { SkillsFormContainer } from './SkillsFormContainer';
import ResumeSkills from '../resume/ResumeSkills';
import { downloadPDF } from '../functions';
import { handleProEditSubmit } from '../functions';

function Home() {
  const [currKey, setCurrKey] = useState('');
  const [currProKey, setCurrProKey] = useState('');
  const [currProjKey, setCurrProjKey] = useState('');
  const [currEduKey, setCurrEduKey] = useState('');

  //Active states
  const [genActive, setGenActive] = useState(false);
  const [eduActive, setEduActive] = useState(false);
  const [proActive, setProActive] = useState(false);
  const [projActive, setProjActive] = useState(false);
  const [skillsActive, setSkillsActive] = useState(false);


  const [eduResumeActive, setEduResumeActive] = useState(false);
  const [proResumeActive, setProResumeActive] = useState(false);
  const [projResumeActive, setProjResumeActive] = useState(false);
  const [skillsResumeActive, setSkillsResumeActive] = useState(false);

  //Education states
  const [degree, setDegree] = useState('');
  const [degreeType, setDegreeType] = useState('');
  const [school, setSchool] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [gpa, setGpa] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  //Professional Experience states
  const [job, setJob] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [proStartDate, setProStartDate] = useState('');
  const [proEndDate, setProEndDate] = useState('');
  const [description, setDescription] = useState('');

  //Projects states
  const [title, setTitle] = useState('');
  const [tools, setTools] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [dateCompleted, setDateCompleted] = useState('')

  //General Information states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cityProv, setCityProv] = useState('');

  //Skills information states
  const [skills, setSkills] = useState('');


  //Form arrays
  const [education, setEducation] = useState([]);
  const [professional, setProfessional] = useState([]);
  const [projects, setProjects] = useState([]);

  //Edit buttons
  const [eduEditActive, setEduEditActive] = useState(false);
  const [proEditActive, setProEditActive] = useState(false);
  const [projEditActive, setProjEditActive] = useState(false);



  //Education functions
  const handleEduSubmit = (e) => {
    e.preventDefault();

    //Creates new education object and adds it to education list
    const newEducation = { id: self.crypto.randomUUID(), degree: degree, degreeType: degreeType, school: school, city: city, country: country, startDate: startDate, endDate: endDate, gpa: gpa };
    setEducation([...education, newEducation]);

    // Clear input fields
    setDegree('');  setDegreeType(''), setSchool(''); setCity(''); setCountry(''); setStartDate(''); setEndDate(''); setGpa(0.0);
    setEduResumeActive(true);
    setEduActive(false);
  };

  const handleEduDelete = (id) => {
    setEducation(education.filter(edu => edu.id !== id))
  }

  const handleEduEditSubmit = (e) => {
    e.preventDefault();
    const key = currEduKey;

    const updatedEducation = education.map(edu => {
      if (edu.id === key) {
          // Creates an object with the updated fields that are not empty
          const updatedFields = {
              ...(degree && { degree }),
              ...(degreeType && {degreeType}),
              ...(school && { school }),
              ...(city && { city }),
              ...(country && { country }),
              ...(startDate && { startDate }),
              ...(endDate && { endDate }),
              ...(gpa && { gpa }),
          };
          // Merges the updated fields into the existing education entry
          return { ...edu, ...updatedFields };
      }

      return edu

      });
      setEducation(updatedEducation);
      setEduEditActive(false);
      setDegree(''); setDegreeType(''), setSchool(''); setCity(''); setCountry(''); setStartDate(''); setEndDate(''); setGpa(0.0);
  }

  const handleEduEdit = (id) => {
      setCurrEduKey(id);
      setEduEditActive(true);
      setEduActive(false)
  }



  //Professtional functions
  function professionalEditSubmit(e) {
    handleProEditSubmit(e, setProfessional, setProEditActive, currProKey, professional, job, company, location, proStartDate, proEndDate, description)
    setJob(''); setCompany(''); setProStartDate(''); setProEndDate(''); setDescription(''); setLocation('')
  }

  const handleProEdit = (id) => {
    setCurrProKey(id);
    setProEditActive(true);

  }

  const handleProSubmit = (e) => {
    e.preventDefault();
    const newProfessional = { id: self.crypto.randomUUID(), job: job, company: company, location: location, proStartDate: proStartDate, proEndDate: proEndDate, description: description };
    setProfessional([...professional, newProfessional]);
    setJob(''); setCompany(''); setProStartDate(''); setProEndDate(''); setDescription(''); setLocation('')
    setProResumeActive(true);
    setProActive(false);
  }

  const handleProDelete = (id) => {
    setProfessional(professional.filter(pro => pro.id !== id));
  }




  //Project functions
  const handleProjEditSubmit = (e) => {
    e.preventDefault();
    const key = currProjKey
    console.log('submitted key', key)

    const updatedProjects = projects.map(proj => {
      if (proj.id === key) {

          // Creates an object with the updated fields that are not empty
          const updatedFields = {
              ...(title  && { title }),
              ...(tools && { tools }),
              ...(projectDescription && { projectDescription }),
              ...(dateCompleted && { dateCompleted }),
          };
          // Merges the updated fields into the existing education entry
          return { ...proj, ...updatedFields };
      }

      return proj


      });
      setProjects(updatedProjects);
      setProjEditActive(false);
      setTools(''); setTitle(''), setProjectDescription(''); setDateCompleted('');
  }


  const handleProjEdit = (id) => {
    setCurrProjKey(id);
    setProjEditActive(true);


  }

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const newProject = { id: self.crypto.randomUUID(), title: title,  tools: tools, projectDescription: projectDescription, dateCompleted: dateCompleted };
    setProjects([...projects, newProject]);
    setTools(''); setTitle(''); setDateCompleted(''); setProjectDescription('');
    setProjResumeActive(true);
    setProjActive(false);
  }

  const handleProjDelete = (id) => {
    setProjects(projects.filter(proj => proj.id !== id));
  }


  const handleGenSubmit = (e) => {
    e.preventDefault();
  }


  function handleDownload() {
    downloadPDF()
  }




  return (
    <>
      <div className="flex flex-wrap gap-10 justify-center bg-slate-100">
        <div className="flex flex-col gap-y-5 pt-5">
          <div className="rounded-3xl shadow-md w-96 bg-white px-5 py-2">
            <div className="education">
              <FormContainer Active={eduActive}
                  setActive={setEduActive}
                  name={'Education'}
                  />
            </div>
            {education.map(edu => (
                  <EducationFormItem onDelete={handleEduDelete} onEdit={handleEduEdit} key={edu.id} id={edu.id} degree={edu.degree} degreeType={edu.degreeType} city={edu.city} school={edu.school} country={edu.country} startDate={edu.startDate} endDate={edu.endDate} gpa={edu.gpa} />
              ))}

            {eduActive && !eduEditActive && (
                      <div>
                          <form onSubmit={handleEduSubmit}>
                            <EducationContainerForm degree ={degree} setDegree={setDegree} degreeType={degreeType} setDegreeType={setDegreeType} school={school} setSchool={setSchool} city={city} setCity={setCity}
                                country={country} setCountry={setCountry} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} gpa={gpa} setGpa={setGpa}/>
                          </form>
                      </div>
                  )}
              {eduEditActive && (
                <>
                    <form onSubmit={handleEduEditSubmit}>
                            <EducationEditForm degree ={degree} setDegree={setDegree} degreeType={degreeType} setDegreeType={setDegreeType} school={school} setSchool={setSchool} city={city} setCity={setCity}
                                country={country} setCountry={setCountry} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} gpa={gpa} setGpa={setGpa}/>
                    </form>
                </>
              )}
          </div>

          {/* Professional Information */}
          <div className="rounded-3xl shadow-md w-96 bg-white px-5 py-2">
            <div className="professional">
              <FormContainer Active={proActive}
                  setActive={setProActive}
                  name={'Professional Experience'} />
            </div>
            {professional?.map(pro => (
                  <ProfessionalFormItem onDelete={handleProDelete} onEdit={handleProEdit} key={pro.id} id={pro.id} job={pro.job} location={pro.location} company={pro.company} proStartDate={pro.proStartDate} proEndDate={pro.proEndDate} description={pro.description}  />
              ))}

            {proActive && !proEditActive && (
                    <div>
                    <form onSubmit={handleProSubmit}>
                      <ProfessionalContainerForm job ={job} setJob={setJob} company={company} setCompany={setCompany} location={location} setLocation={setLocation} proStartDate={proStartDate} setProStartDate={setProStartDate}
                             proEndDate={proEndDate} setProEndDate={setProEndDate} setDescription={setDescription} description={description}/>
                    </form>
                </div>
                  )}

            {proEditActive && (
                  <>
                    <form onSubmit={professionalEditSubmit}>
                      <ProfessionalEditForm  job ={job} setJob={setJob} company={company} setCompany={setCompany} location={location} setLocation={setLocation} proStartDate={proStartDate} setProStartDate={setProStartDate}
                             proEndDate={proEndDate} setProEndDate={setProEndDate} setDescription={setDescription} description={description}/>
                    </form>
                  </>
                )}
          </div>


          {/* General Information */}
          <div className="rounded-3xl shadow-md w-96 bg-white px-5 py-2">
            <div className="general">
              <FormContainer Active={genActive}
                  setActive={setGenActive}
                  name={'General Information'} />
            </div>

            {genActive && (
                    <div>
                      <form onSubmit={handleGenSubmit}>
                      <GeneralFormContainer fullName ={fullName} setFullName={setFullName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone}
                          cityProv={cityProv} setCityProv={setCityProv} />
                      </form>
                    </div>
                  )}
          </div>



          {/* Projects */}
          <div className="rounded-3xl shadow-md w-96 bg-white px-5 py-2">
            <div className="general">
              <FormContainer Active={projActive}
                  setActive={setProjActive}
                  name={'Projects'} />
            </div>

            {projects.map(pro => (
                  <ProjectFormItem key={pro.id} id={pro.id} title={pro.title} tools={pro.tools}  projectDescription={pro.projectDescription} dateCompleted={pro.dateCompleted} onDelete={handleProjDelete} onEdit={handleProjEdit}/>
              ))}

            {projActive && !projEditActive && (
                    <div>
                    <form onSubmit={handleProjectSubmit}>
                    <ProjectFormContainer title={title} setTitle={setTitle} tools={tools} setTools={setTools} projectDescription={projectDescription} setProjectDescription={setProjectDescription}
                    dateCompleted={dateCompleted} setDateCompleted={setDateCompleted}/>
                    </form>
                    </div>
                  )}

            {projEditActive && (
                <>
                    <form onSubmit={handleProjEditSubmit}>
                        <ProjectEditForm title={title} setTitle={setTitle} tools={tools} setTools={setTools} projectDescription={projectDescription} setProjectDescription={setProjectDescription}
                        dateCompleted={dateCompleted} setDateCompleted={setDateCompleted}/>
                    </form>
                </>
              )}
          </div>



          {/* Skill */}
        <div className="rounded-3xl shadow-md w-96 bg-white px-5 py-2">
          <div className="general">
                <FormContainer Active={skillsActive}
                    setActive={setSkillsActive}
                    name={'Skills'} />
          </div>

            {skillsActive && (
                    <div>
                      <SkillsFormContainer skills={skills} setSkills={setSkills} />
                    </div>
              )}

        </div>

          <div className='flex items-start py-5'>
            <button onClick={handleDownload} className='bg-[#2356F6] rounded-full text-white px-7 py-2 text-center hover:bg-[#00c6ff] transition-all duration-300 ease-in-out'>Download</button>
          </div>

        </div>






        {/* Resume page */}
        <div className="right-side">
          <div className="Resume flex flex-col gap-1" id="Resume">
            <ResumeHeader name={fullName} email={email} phone={phone} cityProv={cityProv}/>
            {eduResumeActive && (
                <>
                {education.length != 0 &&

                  <>
                  <div className="flex justify-center">
                    <h3 className='pb-2 font-bold text-lg'>Education</h3>
                  </div>
                  <div class="line"></div>
                  </>

                }
                </>

              )}
            {education.map(edu => (
              <ResumeEducation key={edu.id} id={edu.id} degree={edu.degree} degreeType={edu.degreeType} school={edu.school} city={edu.city} country={edu.country} startDate={edu.startDate} endDate={edu.endDate} gpa={edu.gpa}/>
              ))}
            {proResumeActive && (
                <>
                {professional.length != 0 &&

                  <>
                  <div className="flex justify-center">
                    <h3 className='pb-2 font-bold text-lg'>Work Experience</h3>
                  </div>
                  <div class="line"></div>
                  </>




                }
                </>
            )}
            {professional.map(pro  => (
                <ResumeProfessional key={pro.id} id={pro.id} job={pro.job} company={pro.company} location={pro.location} proStartDate={pro.proStartDate} proEndDate={pro.proEndDate} description={pro.description}/>
            ))}

            {projResumeActive && (
              <>
              {projects.length != 0 &&

                <>
                <div className="flex justify-center">
                  <h3 className='pb-2 font-bold text-lg'>Projects</h3>
                </div>
                <div class="line"></div>
                </>
              }
              </>

            )}

            {projects.map(proj  => (
                <ResumeProject key={proj.id} id={proj.id} title={proj.title} tools={proj.tools} projectDescription={proj.projectDescription} dateCompleted={proj.dateCompleted}/>
            ))}


            <ResumeSkills skills={skills}/>

          </div>
        </div>



      </div>

    </>
  )
}
export default Home
