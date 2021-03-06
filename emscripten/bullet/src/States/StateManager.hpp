

#ifndef D_STATEMANAGER_HPP
#define D_STATEMANAGER_HPP


#include "IState.hpp"

#include <array>


class StateManager
{

	//
	//
	// singleton

private:
	static StateManager*	m_pInstance;

	StateManager();
	~StateManager();

public:
	static void				create();
	static void				destroy();
	static StateManager*	get();

	// singleton
	//
	//

public:
	// an enum class would be nice
	// but the last enum is used to set the size of a std::array
	// which doesn't seems to work with enum class
	enum /*class*/ e_States
	{
		eMain = 0,
		eTotalStates
	};

private:
	typedef std::array<IState*, e_States::eTotalStates>	t_States;
	t_States	m_States;

	e_States	m_currentState;

public:
	// change state
	// void	 changeState(e_States nextState);

public:
	void	handleEvent(const SDL_Event&);
	void	update(int);
	void	render(const SDL_Surface&);
};


#endif // D_STATEMANAGER_HPP

