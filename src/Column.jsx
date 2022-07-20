import React, { useMemo } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from './Task';

const Column = ({column, tasks, isDropDisabled, index}) => {
    const taskComponents = useMemo(() => (
        tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
        ))
    ), [tasks]);
    
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <div
                    className='column'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <h3 {...provided.dragHandleProps} className='title'>{column.title}</h3>
                    <Droppable
                        droppableId={column.id}
                        isDropDisabled={isDropDisabled}
                        type="TASKS"
                    >
                        {(provided, snapshot) => (
                            <div
                                className={snapshot.isDraggingOver
                                    ? 'task-list-dragging-over'
                                    : 'task-list'
                                }
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {taskComponents}
                                {provided.placeholder}
                            </div>
                        )}

                    </Droppable>
                </div>
            )}

        </Draggable>
    )
};

export default Column;

// class InnerList extends React.Component {

//     shouldComponentUpdate(nextProps) {
//         if (nextProps.tasks === this.props.tasks) {
//             return false;
//         }
//         return true;
//     };

//     render() {
//         return (
//             this.props.tasks.map((task, index) => (
//                 <Task key={task.id} task={task} index={index} />
//             ))
//         )
//     }
// }

// const InnerList = ({ tasks }) => {
//     const taskComponent = useMemo(() => (
//         tasks.map((task, index) => (
//             <Task key={task.id} task={task} index={index} />
//         ))
//     ), [tasks]);

//     return taskComponent;
  
// }
