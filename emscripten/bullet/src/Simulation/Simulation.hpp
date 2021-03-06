

#ifndef	D_SIMULATION_HPP
#define	D_SIMULATION_HPP


#include "IPhysicWrapper.hpp"

#include "Circuit.hpp"
#include "Car.hpp"

#include "AI/GeneticAlgorithm.hpp"


#include <list>


class Simulation
{
private:
	IPhysicWrapper*	m_pPhysicWrapper;

	Circuit						m_Circuit;
	std::vector<Car>			m_Cars;

	NeuralNetworkTopology		m_NNTopology;
	GeneticAlgorithm			m_GenAlgo;

	std::list< std::vector<float> >	m_car_trails;

public:
	Simulation(IPhysicWrapper* pPhysicWrapper);
	~Simulation();

public:
	void	initialise(
		const std::vector<float>& arr_left,
		const std::vector<float>& arr_right,
		Circuit::t_geometry_callback callback
	);

public:
	void	update();

public:
	const std::vector<Car>&	getCars() const { return m_Cars; }
	const std::list< std::vector<float> >&	getCarTrails() const { return m_car_trails; }
};


#endif // D_SIMULATION_HPP

