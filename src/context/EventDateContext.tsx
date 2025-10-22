import React, { createContext, useState, useContext, ReactNode } from 'react';

interface EventDateContextType {
  rentalStart: string | null;
  rentalEnd: string | null;
  setRentalDates: (start: string | null, end: string | null) => void;
}

const EventDateContext = createContext<EventDateContextType | undefined>(undefined);

export const EventDateProvider = ({ children }: { children: ReactNode }) => {
  const [rentalStart, setRentalStart] = useState<string | null>(null);
  const [rentalEnd, setRentalEnd] = useState<string | null>(null);

  const setRentalDates = (start: string | null, end: string | null) => {
    setRentalStart(start);
    setRentalEnd(end);
  };

  return (
    <EventDateContext.Provider value={{ rentalStart, rentalEnd, setRentalDates }}>
      {children}
    </EventDateContext.Provider>
  );
};

export const useEventDate = () => {
  const context = useContext(EventDateContext);
  if (context === undefined) {
    throw new Error('useEventDate must be used within an EventDateProvider');
  }
  return context;
};
