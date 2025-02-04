1. The Workspace is the brain of TaskRouter. It controls how Tasks get routed into TaskQueues and to Workers. (El espacio de trabajo es el cerebro de TaskRouter. Controla cómo se envían las tareas a las colas de tareas y a los trabajadores.)

		False
El flujo de trabajo es el cerebro de TaskRouter. El espacio de trabajo es el contenedor que ayuda a separar varias implementaciones de TaskRouter (por ejemplo, para diferentes divisiones de la empresa).


2. A Worker can be associated with only one TaskQueue.
	false
	
	Un trabajador puede asociarse con más de una TaskQueue. Se asociará con cada TaskQueue cuyas expresiones de trabajador de destino coincidan.

3. What is the size limit for Task and Worker attributes?
	 4kb



4. During their lifetime, Tasks progress through a series of states. Match the following Task states to their correct description.

![[Pasted image 20250203223836.png]]


5. Worker and Task attributes must follow a fixed JSON structure defined by the TaskRouter JSON schema.
		false
	La estructura de los atributos es completamente arbitraria (con una notable excepción de contact_uri).

6. A ____--------______ is the container for your entire contact center, it owns all of the settings, queues, routing logic and more.

	Workspace
Un espacio de trabajo es el contenedor. Un flujo de trabajo es el cerebro que controla la lógica de enrutamiento, mientras que TaskQueue es el mecanismo para agrupar tareas similares y los trabajadores que las gestionan. TaskRouter es simplemente el nombre del producto.
    

