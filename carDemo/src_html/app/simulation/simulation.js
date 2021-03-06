
'use strict'

var createCircuit = require('./circuit.js');
var createCar = require('./car.js');
var createGeneticAlgo = require('../ai/geneticAlgo.js');

//

var createSimulation = function (elem_id)
{
	// circuit
	this._circuit = new createCircuit(elem_id);

	var genome_size = 40;
	this._ann_topology = [5, 3, 2];

	this._geneticAlgo = new createGeneticAlgo( genome_size, this._ann_topology );

	//

	// cars
	this._cars = [];
	for (var i = 0; i < genome_size; ++i)
	{
		var car = new createCar();

		this._geneticAlgo._genomes[i].car = car;

		car._position = {
			  x: this._circuit._start_position.x
			, y: this._circuit._start_position.y
		};

		car._angle = this._circuit._start_angle;

		car._checkpoints = this._circuit._checkpoints;

		this._cars.push(car);
	}

	this._trails = [];

	this._start_to_stop_sens = true;
};

//

createSimulation.prototype.update = function(step)
{
	var someone_is_alive = false;

	for (var i = 0; i < this._cars.length; ++i)
	{
		if (!this._cars[i]._alive)
			continue;

		this._cars[i].update(step, this._circuit._walls, this._geneticAlgo._ANNs[i]);

		someone_is_alive = true;
	}


	// end of the current generation?

	if (someone_is_alive)
		return; // no

	// rate the genome

	for (var i = 0; i < this._cars.length; ++i)
		this._geneticAlgo._genomes[i].fitness = this._cars[i]._fitness;

	this._geneticAlgo.BreedPopulation();

	// save the best trail

	if (this._geneticAlgo._is_a_great_generation)
	{
		this._geneticAlgo._is_a_great_generation = false;

		this._trails.push( this._geneticAlgo._alpha_genome.car._trail );
		if (this._trails.length > 5)
			this._trails.splice(0, 1);
	}

	// reset the cars

	this._start_to_stop_sens = !this._start_to_stop_sens;

	for (var i = 0; i < this._cars.length; ++i)
	{
		var car = this._cars[i];

		this._geneticAlgo._genomes[i].car = car;

		car._position = {
			  x: this._circuit._start_position.x
			, y: this._circuit._start_position.y
		};

		car._angle = this._circuit._start_angle;

		car._current_checkpoint = 0;

		car._alive = true;
		car._fitness = 0;
		car._total_update = 0;
		car._trail = [];
		car._min_updates = 100;
	}
};

//

module.exports = createSimulation;
