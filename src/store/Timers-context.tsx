import {
  useContext,
  type FunctionComponent,
  ReactNode,
  createContext,
  useReducer,
} from "react";

interface Timer {
  id: number;
  name: string;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerNewData {
  id: number;
  name?: string;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

type TimersState = Timer[];

interface TimersFunctions {
  addTimer: (timer: Timer) => void;
  deleteTimer: (id: number) => void;
  updateTimer: (updatedTimer: TimerNewData) => void;
}

type TimersContextType = {
  timers: TimersState;
} & TimersFunctions;

const timersContext = createContext<TimersContextType | null>(null);

export const useTimersContext = () => {
  const timersState = useContext(timersContext);
  if (timersState === null) {
    throw new Error(
      "timers state is null u forgot to use the provider wrapper"
    );
  }
  return timersState;
};

const initalState: TimersState = [];

interface AddTimerAction {
  type: "addTimer";
  payload: Timer;
}

interface DeleteTimerAction {
  type: "deleteTimer";
  payload: number;
}

interface UpdateTimerAction {
  type: "updateTimer";
  payload: TimerNewData;
}

type ActionType = AddTimerAction | DeleteTimerAction | UpdateTimerAction;
const timersReducer = (state: TimersState, action: ActionType) => {
  const { type } = action;
  switch (type) {
    case "addTimer": {
      return [...state, action.payload];
    }
    case "deleteTimer": {
      return state.filter((timer) => timer.id !== action.payload);
    }
    
    case "updateTimer": {
      const filterdTimersState = state.filter(
        (timer) => timer.id !== action.payload.id
      );
      
      const tartgetdTimer = state.filter(
        (timer) => timer.id === action.payload.id
      )[0];
      
      const updatedTimer = {
        ...tartgetdTimer,
        ...action.payload,
      };
      
      return [...filterdTimersState, updatedTimer];
    }
    
    default:
      return state;
  }
};

interface ContextProviderProps {
  children: ReactNode;
}

export const TimersContextProvider: FunctionComponent<ContextProviderProps> = ({
  children,
}) => {
  const [timersState, dispatch] = useReducer(timersReducer, initalState);

  const timersCTX: TimersContextType = {
    timers: timersState,
    addTimer: (timer) => {
      dispatch({ type: "addTimer", payload: timer });
    },
    deleteTimer: (id) => {
      dispatch({ type: "deleteTimer", payload: id });
    },
    updateTimer(updatedTimer) {
      dispatch({ type: "updateTimer", payload: updatedTimer });
    },
  };

  return (
    <timersContext.Provider value={timersCTX}>
      {children}
    </timersContext.Provider>
  );
};

export default TimersContextProvider;
