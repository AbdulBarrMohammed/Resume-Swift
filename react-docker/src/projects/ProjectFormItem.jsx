function ProjectFormItem ({id, title, tools, projectDescription, dateCompleted, onDelete, onEdit}) {
    return (

        <div>

            <div class="flex gap-3 items-center">
                <div class="leftFormItem">
                    <h4>{title}</h4>
                    <p>{tools}</p>
                    <p>{projectDescription}</p>
                    <p>{dateCompleted}</p>
                </div>
                <div class="rightFormItem">
                    <button className="rounded-3xl" onClick={() => onDelete(id)}>Delete</button>
                    <button className="rounded-3xl" onClick={() => onEdit(id)}>Edit</button>
                </div>
            </div>

            <hr className="border-black my-1"/>

        </div>


    );
}

export default ProjectFormItem;
