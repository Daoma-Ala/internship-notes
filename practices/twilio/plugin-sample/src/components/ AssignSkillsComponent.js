import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'AGENT';  // Tipo de item que será arrastrado (el agente)

const AssignSkillsComponent = ({ agents, skills, workspaceSid, manager }) => {
  const [assignedSkills, setAssignedSkills] = useState({});

  const handleDrop = (agentSid, skill) => {
    updateAgentSkills(agentSid, skill);
    setAssignedSkills(prevState => ({
      ...prevState,
      [agentSid]: skill
    }));
  };

  const updateAgentSkills = async (agentSid, skill) => {
    const client = manager.client; // Ahora `manager` está disponible
    const worker = await client.taskrouter.workspaces(workspaceSid).workers(agentSid).fetch();

    const updatedAttributes = {
      ...worker.attributes,
      skills: [...(worker.attributes.skills || []), skill],
    };

    await client.taskrouter.workspaces(workspaceSid).workers(agentSid).update({ attributes: updatedAttributes });
    console.log(`Agente ${agentSid} actualizado con skill ${skill}`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '20px' }}>
        <h3>Agentes</h3>
        {agents.map(agent => (
          <DraggableAgent key={agent.sid} agent={agent} />
        ))}
      </div>
      <div>
        <h3>Skills</h3>
        {skills.map(skill => (
          <DroppableSkill key={skill} skill={skill} onDrop={handleDrop} />
        ))}
      </div>
    </div>
  );
};

const DraggableAgent = ({ agent }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { agentSid: agent.sid },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ marginBottom: '10px', opacity: isDragging ? 0.5 : 1 }}>
      {agent.name}
    </div>
  );
};

const DroppableSkill = ({ skill, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => onDrop(item.agentSid, skill),
  }));

  return (
    <div ref={drop} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
      {skill}
    </div>
  );
};

export default AssignSkillsComponent;
