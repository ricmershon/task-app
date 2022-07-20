import React, { useState } from 'react';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from './Column'
import './App.css';
import initialData from './initial-data';

const App = () => {
    const [toDos, setToDos] = useState(initialData);
    const [homeIndex, setHomeIndex] = useState(null)

    const onDragStart = (start) => {
        const homeIndex = toDos.columnOrder.indexOf(start.source.droppableId);
        setHomeIndex(homeIndex);
    };

    const onDragEnd = ( { destination, source, draggableId, type }) => {
        setHomeIndex(null);

        //  Dragged outside of droppable
        if (!destination) {
            return;
        };

        // Dragged on top of itself
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        };

        if (type === 'COLUMN') {
            const newColumnOrder = [...toDos.columnOrder];
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newToDos = {
                ...toDos,
                columnOrder: newColumnOrder
            };
            setToDos(newToDos);
        }
        // Move taskId from old index to new index
        const startColumn = toDos.columns[source.droppableId];
        const endColumn = toDos.columns[destination.droppableId];

        // Dropping into the same column
        if (startColumn === endColumn) {
            const newTaskIds = [...startColumn.taskIds];
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...startColumn,
                taskIds: newTaskIds
            };
    
            const newToDos = {
                ...toDos,
                columns: {
                    ...toDos.columns,
                    [newColumn.id]: newColumn
                }
            };
            setToDos(newToDos);
            return;
        }

        // Dropping into a different column
        const startTaskIds = [...startColumn.taskIds];
        startTaskIds.splice(source.index, 1);
        const newStartColumn = {
            ...startColumn,
            taskIds: startTaskIds,
        };

        const endTaskIds = [...endColumn.taskIds];
        endTaskIds.splice(destination.index, 0, draggableId);
        const newEndColumn = {
            ...endColumn,
            taskIds: endTaskIds
        };

        const newToDos = {
            ...toDos,
            columns: {
                ...toDos.columns,
                [newStartColumn.id]: newStartColumn,
                [newEndColumn.id]: newEndColumn
            }
        };
        setToDos(newToDos);
    };

    return (
        <DragDropContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <Droppable droppableId='all-columns' direction='horizontal' type='COLUMN'>
                {(provided) => (
                    <div
                        className='container'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {toDos.columnOrder.map((columnId, index) => {
                            const column = toDos.columns[columnId];

                            const isDropDisabled = homeIndex > index;

                            return (
                                <InnerList
                                    isDropDisabled={isDropDisabled}
                                    key={column.id}
                                    column={column}
                                    tasksMap={toDos.tasks}
                                    index={index}
                                />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );

};

class InnerList extends React.PureComponent {
    render() {
        const { column, tasksMap, index, isDropDisabled } = this.props;
        const tasks = column.taskIds.map((taskId) => tasksMap[taskId]);

        return <Column column={column} tasks={tasks} index={index} isDropDisabled={isDropDisabled}/>
    }

}


export default App;
