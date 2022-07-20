import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({task, index}) => {
    const [dragDisabled, setDragDisabled] = useState(true);

    // const isDragDisabled = task.id === 'task-1';
    const isDragDisabled = false;

    return (
        <Draggable
            draggableId={task.id}
            index={index}
            isDragDisabled={dragDisabled}
        >
            {(provided, snapshot) => (
                <div
                    className={
                        isDragDisabled
                            ? 'task-disabled'
                            : snapshot.isDragging
                                ? 'task-dragging'
                                : 'task'
                    }
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {task.content}
                    <label className="switch">
                        <input
                            onClick={() => setDragDisabled(!dragDisabled)}
                            type="checkbox" />
                        <div className="slider round">
                        {/* <i class="fa-solid fa-check"></i> */}
                            <span className="on"><i className="fa-solid fa-check fa-sm"></i></span>
                            <span className="off"><i className="fa-solid fa-minus fa-sm"></i></span>
                        </div>
                    </label>
                    
                </div>
            )}
        </Draggable>
    );
};

export default Task;